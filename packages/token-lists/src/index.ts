import { buildList, saveList, VersionBump } from "./buildList";
import checksumAddresses from "./checksum";
import ciCheck from "./ci-check";
import topTokens from "./top-100";
import fetchThirdPartyList from "./fetchThirdPartyList";
import getTokensChainData from "./utils/getTokensChainData";

const command = process.argv[2];
const listName = process.argv[3];
const versionBump = process.argv[4];

switch (command) {
  case "checksum":
    checksumAddresses(listName);
    break;
  case "generate":
    saveList(buildList(listName, versionBump as VersionBump), listName);
    break;
  case "fetch":
    if (listName === "pcs-top-100") {
      topTokens();
    }
    fetchThirdPartyList(listName);
    break;
  case "ci-check":
    ciCheck();
    break;
  case "get-list-from-addresses":
    getTokensChainData("pancakeswap-mini-extended");
    break;
  default:
    console.info("Unknown command");
    break;
}
