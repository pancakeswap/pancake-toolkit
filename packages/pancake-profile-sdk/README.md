# Pancakeswap Profile SDK

This package provides some handy functions to retrieve data for Pancakeswap Profile system.

If you're looking for React-ready solution - take a look at the [profile-hook](https://github.com/pancakeswap/pancake-toolkit/tree/master/packages/pancake-profile-hook).

##### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [getUsername](#getUsername)
  - [getTeam](#getTeam)
  - [getProfile](#getProfile)
  - [getAchievements](#getAchievements)
- [Roadmap](#roadmap)

## Installation

Install `@pancakeswap-libs/profile-sdk` into your project with npm:

```bash
npm install @pancakeswap-libs/profile-sdk --save
```

or yarn:

```bash
yarn add @pancakeswap-libs/profile-sdk
```

This package requires `web3` to be installed in your project. If you're using TypeScript you also should install `web3-eth-contract` and `web3-utils` to avoid type errors, although depending on your TypeScript and ESlint configuration you might skip installing those (since they are sub-packages of web3).

```bash
# npm
npm install web3 --save
# yarn
yarn add web3
```

## Usage

Package provides several functions to retrieve profile data:

### getUsername

Returns username for a given address. If the address does not have a profile or there is an error - returns empty string `""`.

```js
import { getUsername } from "@pancakeswap-libs/profile-sdk";

const username = getUsername("0x123456789");
console.log(username); // "Matatabi"
```

### getTeam

Returns team information for the team ID. In case of network error returns null. Note that at the moment `points` will return `0` for all teams (total team points will be calculated soon).

```js
import { getTeam } from "@pancakeswap-libs/profile-sdk";

const team = getTeam(1);
console.log(team);
// {
//   id: 1,
//   name: "Syrup Storm",
//   description: "The storm's a-comin! Watch out! These bulls are stampeding in a syrupy surge!",
//   isJoinable: true,
//   users: 55123;
//   points: 182500;
//   images: images: {
//     lg: "syrup-storm-lg.png",
//     md: "syrup-storm-md.png",
//     sm: "syrup-storm-sm.png",
//     alt: "syrup-storm-alt.png",
//     ipfs: "https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/syrup-storm.png",
//   },
//   background: syrup-storm-bg.svg;
//   textColor: "#191326";
// }
```

### getProfile

Returns full profile data for a given address. Under the hood retrieves username and team data using `getUsername` and `getTeam` and combines it with data from profile contract. If address does not have a profile returns `{ hasRegistered: false, profile: null }`. At the moment does not retrieve achievements (see [getAchievements](#getAchievements)).

It also sets `profile_${address}` cookie containing username and avatar (now only for pancakeswap.finance domain, maybe configurable in future versions)

```js
import { getProfile } from "@pancakeswap-libs/profile-sdk";

const profile = getProfile("0x123456789");
console.log(profile);
// {
//   hasRegistered: true
//   profile: {
//     userId: 6173;
//     points: 2500;
//     teamId: 1;
//     nftAddress: "0x11111111";
//     tokenId: 15;
//     isActive: true;
//     username: "Matatabi";
//     nft: {
//       name: "Hiccup",
//       description: "Oopsie daisy! Hiccup's had a bit of an accident. Poor little fella.",
//       images: {
//         lg: "hiccup-lg.png",
//         md: "hiccup-md.png",
//         sm: "hiccup-sm.png",
//         ipfs: "https://gateway.pinata.cloud/ipfs/QmQ6EE6gkVzAQUdQLLM7CyrnME6LZHCoy92ZERW8HXmyjw/hiccup.png",
//       },
//       sortOrder: 999,
//       bunnyId: 10,
//     },
//     team: {
//       id: 1,
//       name: "Syrup Storm",
//       description: "The storm's a-comin! Watch out! These bulls are stampeding in a syrupy surge!",
//       isJoinable: true,
//       users: 55123;
//       points: 182500;
//       images: images: {
//         lg: "syrup-storm-lg.png",
//         md: "syrup-storm-md.png",
//         sm: "syrup-storm-sm.png",
//         alt: "syrup-storm-alt.png",
//         ipfs: "https://gateway.pinata.cloud/ipfs/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG sy  rup-storm.png",
//       },
//       background: syrup-storm-bg.svg;
//       textColor: "#191326";
//     },
//     hasRegistered: true;
//   }
// }
```

### getAchievements

Returns array of achievements for a given address. If address has no achievements or no profile at all - returns empty array `[]`.

```js
import { getAchievements } from "@pancakeswap-libs/profile-sdk";

const achievements = getAchievements("0x123456789");
console.log(achievements);
// [
//   {
//     id: "511080000",
//     type: "ifo",
//     address: "0x123456789",
//     title: {
//       id: 999,
//       fallback: `IFO Shopper: Belt`,
//       data: {
//         name: "Belt",
//       },
//     },
//     description: {
//       id: 999,
//       fallback: `Committed more than $5 worth of LP in the Belt IFO`,
//       data: {
//         name: "Belt",
//       },
//     },
//     badge: "ifo-belt.svg",
//     points: 200,
//   },
//   {
//     id: "512010010",
//     type: "teambattle",
//     address: "0x123456789",
//     title: "Easter Participant: Silver",
//     badge: "easter-participant-silver.svg",
//     points: 500,
//   },
// ];
```

## Roadmap

Current version of this SDK is 90% copy of existing from [pancake-frontend](https://github.com/pancakeswap/pancake-frontend) repo. There are several improvements to be made in the future versions of this SDK:

- [ ] Better error handling (common bad status codes or broken internet connection)
- [ ] Allow username & avatar cookie to be configurable or optional
