import { server, rest } from "../mocks/server";
import { profileApi } from "../constants/common";
import getUsername from "./getUsername";
import { existingAddress1, nonexistentAddress } from "../mocks/mockAddresses";

describe("getUsername", () => {
  it("returns username for valid address", async () => {
    await expect(getUsername(existingAddress1)).resolves.toEqual("Cheems");
  });
  it("returns empty string for invalid address", async () => {
    await expect(getUsername(nonexistentAddress)).resolves.toEqual("");
  });
  it("returns empty string when there is internal server error", async () => {
    server.use(
      rest.get(`${profileApi}/api/users/${existingAddress1}`, async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "500 Internal Server Error" }));
      })
    );
    await expect(getUsername(nonexistentAddress)).resolves.toEqual("");
  });
});
