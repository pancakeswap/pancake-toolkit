import getAchievements from "./getAchievements";
import { existingAddress1, existingAddress2, nonexistentAddress } from "../mocks/mockAddresses";

describe("getAchievements", () => {
  it("returns achievements for existing address", async () => {
    const expectedAchievements = [
      {
        id: "511080000",
        type: "ifo",
        address: existingAddress1, // TODO: confirm
        title: {
          id: 999,
          fallback: `IFO Shopper: Belt`,
          data: {
            name: "Belt",
          },
        },
        description: {
          id: 999,
          fallback: `Committed more than $5 worth of LP in the Belt IFO`,
          data: {
            name: "Belt",
          },
        },
        badge: "ifo-belt.svg",
        points: 200,
      },
      {
        id: "512010010",
        type: "teambattle",
        address: existingAddress1, // TODO: confirm
        title: "Easter Participant: Silver",
        badge: "easter-participant-silver.svg",
        points: 500,
      },
      {
        id: "511090000",
        type: "ifo",
        address: existingAddress1, // TODO: confirm
        title: {
          id: 999,
          fallback: `IFO Shopper: Horizon Protocol`,
          data: {
            name: "Horizon Protocol",
          },
        },
        description: {
          id: 999,
          fallback: `Committed more than $5 worth of LP in the Horizon Protocol IFO`,
          data: {
            name: "Horizon Protocol",
          },
        },
        badge: "ifo-hzn.svg",
        points: 100,
      },
    ];
    const achievements = await getAchievements(existingAddress1);
    expect(achievements).toEqual(expectedAchievements);
  });
  it("returns empty array for address with no achievements", async () => {
    const achievements = await getAchievements(existingAddress2);
    expect(achievements).toEqual([]);
  });
  it("returns empty array for non-existent address", async () => {
    const achievements = await getAchievements(nonexistentAddress);
    expect(achievements).toEqual([]);
  });
});
