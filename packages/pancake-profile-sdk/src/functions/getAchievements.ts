import { request, gql } from "graphql-request";
import { profileSubgraphApi } from "../constants/common";
import { campaignMap } from "../constants/campaings";
import { Achievement, Campaign, TranslatableText } from "../types";

interface UserPointIncreaseEvent {
  campaignId: string;
  id: string; // wallet address
  points: string;
}

const getAchievementTitle = (campaign: Campaign): TranslatableText => {
  switch (campaign.type) {
    case "ifo":
      return {
        id: 999,
        fallback: `IFO Shopper: ${campaign.title}`,
        data: {
          name: campaign.title as string,
        },
      };
    default:
      return campaign.title;
  }
};

const getAchievementDescription = (campaign: Campaign): TranslatableText => {
  switch (campaign.type) {
    case "ifo":
      return {
        id: 999,
        fallback: `Committed more than $5 worth of LP in the ${campaign.title} IFO`,
        data: {
          name: campaign.title as string,
        },
      };
    default:
      return campaign.description;
  }
};

/**
 * Gets all user point increase events on the profile filtered by wallet address
 */
const getUserPointIncreaseEvents = async (account: string): Promise<UserPointIncreaseEvent[]> => {
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
    return data.user.points;
  } catch (error) {
    return null;
  }
};

const getAchievements = async (account: string): Promise<Achievement[]> => {
  const pointIncreaseEvents = await getUserPointIncreaseEvents(account);

  if (!pointIncreaseEvents) {
    return [];
  }

  return pointIncreaseEvents.reduce((accum, userPoint) => {
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
};

export default getAchievements;
