import Cookies from "js-cookie";
import { Profile, Nft } from "../types";
import { getProfileContract, getPancakeRabbitContract } from "../utils/contractHelpers";
import getTeam from "./getTeam";
import nfts from "../constants/nfts";
import getUsername from "./getUsername";

const profileContract = getProfileContract();
const rabbitContract = getPancakeRabbitContract();

export type ProfileResponse = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: boolean;
};

export interface GetProfileResponse {
  hasRegistered: boolean;
  profile?: Profile;
}

export const transformProfileResponse = (profileResponse: ProfileResponse): Partial<Profile> => {
  const { 0: userId, 1: numberPoints, 2: teamId, 3: nftAddress, 4: tokenId, 5: isActive } = profileResponse;

  return {
    userId: Number(userId),
    points: Number(numberPoints),
    teamId: Number(teamId),
    tokenId: Number(tokenId),
    nftAddress,
    isActive,
  };
};

/**
 * Fetches profile information for specified address.
 * This function combines data from getUsername and getTeam with profile data received getUserProfile method
 * from PancakeProfile contract.
 * NFT's bunnyId is retrieved from PancakeBunnies contract and mapped to static NFT data stored in constant.
 * Contracts repo - https://github.com/pancakeswap/pancake-contracts/tree/master/projects/profile-nft-gamification
 */
const getProfile = async (address: string): Promise<GetProfileResponse> => {
  try {
    const hasRegistered = (await profileContract.methods.hasRegistered(address).call()) as boolean;

    if (!hasRegistered) {
      return { hasRegistered, profile: null };
    }

    const profileResponse = await profileContract.methods.getUserProfile(address).call();
    const { userId, points, teamId, tokenId, nftAddress, isActive } = transformProfileResponse(profileResponse);
    const team = await getTeam(teamId);
    const username = await getUsername(address);

    // If the profile is not active the tokenId returns 0, which is still a valid token id
    // so only fetch the nft data if active
    let nft: Nft;
    if (isActive) {
      const bunnyId = await rabbitContract.methods.getBunnyId(tokenId).call();
      nft = nfts.find((nftItem) => nftItem.bunnyId === Number(bunnyId));

      // Save the preview image in a cookie so it can be used on the exchange
      // TODO v2: optional (and configurable) Cookies.set
      Cookies.set(
        `profile_${address}`,
        {
          username,
          avatar: `https://pancakeswap.finance/images/nfts/${nft.images.sm}`,
        },
        { domain: "pancakeswap.finance", secure: true, expires: 30 }
      );
    }

    const profile = {
      userId,
      points,
      teamId,
      tokenId,
      username,
      nftAddress,
      isActive,
      nft,
      team,
    } as Profile;

    return { hasRegistered, profile };
  } catch (error) {
    return null;
  }
};

export default getProfile;
