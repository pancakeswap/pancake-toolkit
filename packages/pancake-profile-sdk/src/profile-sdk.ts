import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { request, gql } from "graphql-request";
import merge from "lodash/merge";
import Cookies from "js-cookie";
import web3NoAccount from "./utils/web3";
import { getPancakeRabbitContract, getProfileContract } from "./utils/contractHelpers";
import { profileApi, profileSubgraphApi } from "./constants/common";
import { campaignMap } from "./constants/campaings";
import nfts from "./constants/nfts";
import teamsList from "./constants/teams";
import { Achievement, Team, GetProfileResponse, Profile, Nft } from "./types";
import { getAchievementDescription, getAchievementTitle, transformProfileResponse } from "./utils/transformHelpers";

type SdkConstructorArguments = {
  web3?: Web3;
  chainId?: number;
};

// move to types
interface UserPointIncreaseEvent {
  campaignId: string;
  id: string; // wallet address
  points: string;
}

class PancakeProfileSdk {
  web3 = web3NoAccount;

  chainId = 56;

  profileContract: Contract;

  rabbitContract: Contract;

  constructor(args?: SdkConstructorArguments) {
    if (args?.web3) this.web3 = args.web3;
    if (args?.chainId) this.chainId = args.chainId;
    this.profileContract = getProfileContract(this.web3);
    this.rabbitContract = getPancakeRabbitContract(this.web3);
  }

  /**
   * Fetches user information via REST API
   * Contains user information and leaderboard statistics about latest trading competition.
   * API repo - https://github.com/pancakeswap/pancake-profile-api
   */
  getUsername = async (address: string): Promise<string> => {
    try {
      const response = await fetch(`${profileApi}/api/users/${address}`);
      if (!response.ok) {
        return "";
      }

      const { username = "" } = await response.json();
      return username;
    } catch (error) {
      return "";
    }
  };

  getAchievements = async (account: string): Promise<Achievement[]> => {
    try {
      const data = await request(
        profileSubgraphApi,
        gql`
          query getUser($id: String!) {
            user(id: $id) {
              points {
                id
                campaignId
                points
              }
            }
          }
        `,
        { id: account.toLowerCase() }
      );
      if (data.user === null || data.user.points.length === 0) {
        return [];
      }
      return data.user.points.reduce((accum: Achievement[], userPoint: UserPointIncreaseEvent) => {
        const campaignMeta = campaignMap.get(userPoint.campaignId);

        return [
          ...accum,
          {
            id: userPoint.campaignId,
            type: campaignMeta.type,
            address: userPoint.id,
            title: getAchievementTitle(campaignMeta),
            description: getAchievementDescription(campaignMeta),
            badge: campaignMeta.badge,
            points: Number(userPoint.points),
          },
        ];
      }, []);
    } catch (error) {
      return [];
    }
  };

  /**
   * Fetches team information from
   * Contains team name, number of users, total number of points for the team and whether the team is joinable.
   * This data is combined with static team data (images, description, etc) that is stored in constant in this repo.
   * Contract repo - https://github.com/pancakeswap/pancake-contracts/tree/master/projects/profile-nft-gamification
   */
  getTeam = async (teamId: number): Promise<Team> => {
    try {
      const {
        0: teamName,
        2: numberUsers,
        3: numberPoints,
        4: isJoinable,
      } = await this.profileContract.methods.getTeamProfile(teamId).call();
      const staticTeamInfo = teamsList.find((staticTeam) => staticTeam.id === teamId);

      return merge({}, staticTeamInfo, {
        isJoinable,
        name: teamName,
        users: numberUsers,
        points: numberPoints,
      });
    } catch (error) {
      return null;
    }
  };

  /**
   * Fetches profile information for specified address.
   * This function combines data from getUsername and getTeam with profile data received getUserProfile method
   * from PancakeProfile contract.
   * NFT's bunnyId is retrieved from PancakeBunnies contract and mapped to static NFT data stored in constant.
   * Contracts repo - https://github.com/pancakeswap/pancake-contracts/tree/master/projects/profile-nft-gamification
   */
  getProfile = async (address: string): Promise<GetProfileResponse> => {
    try {
      const hasRegistered = (await this.profileContract.methods.hasRegistered(address).call()) as boolean;

      if (!hasRegistered) {
        return { hasRegistered, profile: null };
      }

      const profileResponse = await this.profileContract.methods.getUserProfile(address).call();
      const { userId, points, teamId, tokenId, nftAddress, isActive } = transformProfileResponse(profileResponse);
      const team = await this.getTeam(teamId);
      const username = await this.getUsername(address);

      // If the profile is not active the tokenId returns 0, which is still a valid token id
      // so only fetch the nft data if active
      let nft: Nft;
      if (isActive) {
        const bunnyId = await this.rabbitContract.methods.getBunnyId(tokenId).call();
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
}

export default PancakeProfileSdk;
