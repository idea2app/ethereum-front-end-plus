import { ethers } from 'ethers';

import { abiAndAddress } from '../../../../models/AbiAndAddress'
import { defaultChainInfo } from '../../../../models/ChainInfo'

const url = defaultChainInfo.rpcUrls[0];
const { mbti: { abi, address: contractAddress } } = abiAndAddress;

const provider = new ethers.JsonRpcProvider(url);
const contract = new ethers.Contract(contractAddress, abi, provider);

const countMap = new Map<string, number>();

const CustomResponse = (value: any, status = 200) => new Response(JSON.stringify(value), { status });

const ErrorResponse = (error: string | any, status = 400) => CustomResponse({ error }, status);

export async function POST(request: Request, { params: { address } }: { params: { address: string } }) {
    if (!address) return ErrorResponse('Address parameter is required', 404);
    if (!/^0[xX][0-9a-fA-F]{40}$/.test(address)) return ErrorResponse('Invalid input address', 404);

    const { searchParams } = new URL(request.url);
    const signature = searchParams.get('signature');

    if (!signature) return ErrorResponse('invalid signature');

    if (address !== ethers.verifyMessage(`${address}-${new Date().toISOString().slice(0, 10)}`, signature)) {
        return ErrorResponse('illegal signature');
    }

    const count = (countMap.get(address) || 0) + 1;

    try {
        const value = Number(await contract.getMBTI(address));

        countMap.set(address, count);

        return CustomResponse({ address, value, count });
    } catch (error: any) {
        console.log(error);

        const { shortMessage } = error;

        if (shortMessage) return ErrorResponse(error);

        return ErrorResponse('Not found', 404)
    }
}
