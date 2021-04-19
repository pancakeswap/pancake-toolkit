import addresses from "../constants/contracts";

export const getPancakeProfileAddress = (chainId: number): string => {
  return addresses.pancakeProfile[chainId];
};

export const getPancakeRabbitsAddress = (chainId: number): string => {
  return addresses.pancakeRabbits[chainId];
};
