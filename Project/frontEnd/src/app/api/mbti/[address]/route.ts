import { ethers } from 'ethers';

import { abiAndAddress } from '../../../../models/AbiAndAddress'
import { defaultChainInfo } from '../../../../models/ChainInfo'

const url = defaultChainInfo.rpcUrls[0];
const { mbti: { abi, address: contractAddress } } = abiAndAddress;

const provider = new ethers.JsonRpcProvider(url);
const contract = new ethers.Contract(contractAddress, abi, provider);

const countMap = new Map<string, number>();

export async function POST(request: Request, { params: { address } }: { params: { address: string } }) {
    if (!address) return new Response(JSON.stringify({ error: 'Address parameter is required' }), { status: 404 });
    if (!/0x[A-Za-z0-9]{40}/.test(address)) return new Response(JSON.stringify({ error: 'Invalid input address' }), { status: 404 });

    const { searchParams } = new URL(request.url);
    const signature = searchParams.get('signature');

    // todo)) verify signature

    const count = (countMap.get(address) || 0) + 1;

    try {
        const value = Number(await contract.getMBTI(address));

        countMap.set(address, count);

        return new Response(JSON.stringify({ address, value, count }));
    } catch (error) {
        console.log(error);

        const { shortMessage } = error as any;

        if (shortMessage) return new Response(JSON.stringify({ error: shortMessage }), { status: 400 });

        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    }
}
