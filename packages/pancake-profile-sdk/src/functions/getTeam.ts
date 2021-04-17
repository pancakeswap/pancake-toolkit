import merge from "lodash/merge";
import teamsList from "../constants/teams";
import { getProfileContract } from "../utils/contractHelpers";
import { Team } from "../types";

export type TeamsById = {
  [key: string]: Team;
};
export type TeamResponse = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: boolean;
};

const profileContract = getProfileContract();

/**
 * Fetches team information from
 * Contains team name, number of users, total number of points for the team and whether the team is joinable.
 * This data is combined with static team data (images, description, etc) that is stored in constant in this repo.
 * Contract repo - https://github.com/pancakeswap/pancake-contracts/tree/master/projects/profile-nft-gamification
 */
const getTeam = async (teamId: number): Promise<Team> => {
  try {
    const {
      0: teamName,
      2: numberUsers,
      3: numberPoints,
      4: isJoinable,
    } = await profileContract.methods.getTeamProfile(teamId).call();
    const staticTeamInfo = teamsList.find((staticTeam) => staticTeam.id === teamId);

    // TODO v2: do we need lodash here? Could probably just {...obj1, ...obj2}
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

export default getTeam;
