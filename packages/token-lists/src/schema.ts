import { schema } from "@uniswap/token-lists";

// Modifying maxLength of the token list name since
// "PancakeSwap Token List" doesn't fit into standard 20 characters.
schema.properties.name.maxLength = 32;
schema.definitions.TokenInfo.properties.symbol.pattern =
  "^[𝜏a-zA-Z0-9+\\-%/\\$]+$";

export default schema;
