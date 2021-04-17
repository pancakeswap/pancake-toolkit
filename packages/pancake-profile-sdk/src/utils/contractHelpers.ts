import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import web3NoAccount from "./web3";
import profileABI from "../abi/pancakeProfile.json";
import pancakeRabbitsAbi from "../abi/pancakeRabbits.json";
import { getPancakeProfileAddress, getPancakeRabbitsAddress } from "./addressHelpers";

const getContract = (abi: AbiItem, address: string, web3?: Web3) => {
  const currentWeb3 = web3 ?? web3NoAccount;
  return new currentWeb3.eth.Contract(abi, address);
};

export const getProfileContract = (web3?: Web3): Contract => {
  return getContract((profileABI as unknown) as AbiItem, getPancakeProfileAddress(), web3);
};

export const getPancakeRabbitContract = (web3?: Web3): Contract => {
  return getContract((pancakeRabbitsAbi as unknown) as AbiItem, getPancakeRabbitsAddress(), web3);
};
