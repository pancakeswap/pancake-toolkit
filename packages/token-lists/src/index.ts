import { buildList, saveList } from "./buildList";
import checksumAddresses from "./checksum";
import top100Tokens from "./top-100";
import top15Tokens from "./top-15";

const command = process.argv[2];
const listName = process.argv[3];

switch (command) {
  case "checksum":
    checksumAddresses(listName);
    break;
  case "generate":
    saveList(buildList(listName), listName);
    break;
  case "fetch":
    top100Tokens();
    top15Tokens();
    break;
  default:
    console.info("Unknown command");
    break;
}
