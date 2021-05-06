import { buildList, saveList } from "./buildList";
import checksumAddresses from "./checksum";

const command = process.argv[2];

switch (command) {
  case "checksum":
    checksumAddresses();
    break;
  case "generate":
    saveList(buildList());
    break;
  default:
    console.info("Unknown command");
    break;
}
