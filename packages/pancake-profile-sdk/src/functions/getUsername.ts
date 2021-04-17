import { profileApi } from "../constants/common";

/**
 * Fetches user information via REST API
 * Contains user information and leaderboard statistics about latest trading competition.
 * API repo - https://github.com/pancakeswap/pancake-profile-api
 */
const getUsername = async (address: string): Promise<string> => {
  // TODO v2: validate address with regex
  try {
    const response = await fetch(`${profileApi}/api/users/${address}`);
    if (!response.ok) {
      // TODO v2: Properly handle common bad status codes
      return "";
    }

    const { username = "" } = await response.json();

    return username;
  } catch (error) {
    // TODO v2: Properly handle unknown errors
    return "";
  }
};

export default getUsername;
