import { ethers } from 'ethers';
import express from 'express'
import { chainList } from './data/ChainInfo'
import { abiAndAddress } from './data/AbiAndAddress'

const url = chainList[0].rpcUrls[0];
const { abi, address: contractAddress } = abiAndAddress;

const provider = new ethers.JsonRpcProvider(url);
const contract = new ethers.Contract(contractAddress, abi, provider);

const countMap = new Map<string, number>();

const app = express();

app.get('/', (_, res) => {
    res.send('ok')
});

app.get('/0x[A-Za-z0-9]{40}/', async (req, res) => {
    const address = req.path.substring(1);
    const count = (countMap.get(address) || 0) + 1;
    try {
        const value = Number(await contract.getMBTI(address));

        countMap.set(address, count);

        res.send({
            address,
            value,
            count
        })
    } catch (error) {
        console.log(error);

        res.sendStatus(404);
    }
});

const port = 3000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});