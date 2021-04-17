import addresses from "../constants/contracts";
import { Address } from "../types";

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56;
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return address[chainId] ? address[chainId] : address[mainNetChainId];
};

export const getPancakeProfileAddress = (): string => {
  return getAddress(addresses.pancakeProfile);
};

export const getPancakeRabbitsAddress = (): string => {
  return getAddress(addresses.pancakeRabbits);
};
