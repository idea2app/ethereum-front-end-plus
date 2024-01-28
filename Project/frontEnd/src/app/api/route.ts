import { ethers } from 'ethers';

import { abiAndAddress } from '../../models/AbiAndAddress'
import { chainList } from '../../models/ChainInfo'

const url = chainList[0].rpcUrls[0];
const { mbti: { abi, address: contractAddress } } = abiAndAddress;

const provider = new ethers.JsonRpcProvider(url);
const contract = new ethers.Contract(contractAddress, abi, provider);

const countMap = new Map<string, number>();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const address = searchParams.get('address');
    if (address === null) return Response.json('address param is required', { status: 404 });

    const count = (countMap.get(address) || 0) + 1;

    try {
        const value = Number(await contract.getMBTI(address));

        countMap.set(address, count);

        return Response.json({
            address,
            value,
            count
        })
    } catch (error) {
        console.log(error);

        return Response.json('Not found', { status: 404 });
    }
}
