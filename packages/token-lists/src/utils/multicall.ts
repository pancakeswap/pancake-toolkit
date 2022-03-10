import { ethers } from "ethers";
import { Multicall as MulticallAbiType } from "./abi/types";
import MulticalAbi from "./abi/Multicall.json";
import simpleRpcProvider from "./simpleRpcProvider";

interface MultiCall {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

interface MultiCallOptions {
  requireSuccess?: boolean;
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
const multicallv2 = async <T = any>(
  abi: any[],
  calls: MultiCall[],
  options: MultiCallOptions = { requireSuccess: true }
): Promise<T> => {
  const { requireSuccess } = options;
  const multi = new ethers.Contract(
    "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B",
    MulticalAbi,
    simpleRpcProvider
  ) as MulticallAbiType;
  const itf = new ethers.utils.Interface(abi);

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));
  const returnData = await multi.tryAggregate(requireSuccess, calldata);
  const res = returnData.map((call, i) => {
    const [result, data] = call;
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null;
  });

  return res as any;
};

export default multicallv2;
