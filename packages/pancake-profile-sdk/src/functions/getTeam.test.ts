import getTeam from "./getTeam";
import teams from "../constants/teams";

jest.mock("../utils/contractHelpers");

describe("getTeam", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns team data for valid team", async () => {
    await expect(getTeam(2)).resolves.toEqual({ ...teams[1], users: 77000, points: 341500, isJoinable: true });
  });
  it("returns null for non-existent team id", async () => {
    await expect(getTeam(69)).resolves.toEqual(null);
  });
});
