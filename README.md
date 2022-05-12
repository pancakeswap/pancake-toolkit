# Pancake Toolkit

This repository is a monorepo manage with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [Lerna](https://lerna.js.org/).

## Packages

- [pancake-uikit](https://github.com/pancakeswap/pancake-toolkit/tree/master/packages/pancake-uikit) : React components used to build the Pancake UI.
**Moved to [pancake-frontend](https://github.com/pancakeswap/pancake-frontend)**
- [eslint-config-pancake](https://github.com/pancakeswap/pancake-toolkit/tree/master/packages/eslint-config-pancake) : An ESLint config for pancake, with Typescript and Prettier support. **Moved to [pancake-frontend](https://github.com/pancakeswap/pancake-frontend)**
- [pancake-profile-sdk](https://github.com/pancakeswap/pancake-toolkit/tree/master/packages/pancake-profile-sdk) : Handy functions to retrieve data for Pancakeswap Profile system
- [token-lists](https://github.com/pancakeswap/pancake-toolkit/tree/master/packages/token-lists) : Main PancakeSwap token list and tools to validate it. **Moved to [token-list](https://github.com/pancakeswap/token-list)**

## How to use

Clone the repository

```
git clone git@github.com:pancakeswap/pancake-toolkit.git
```

Run yarn at the root of the workspace

```
cd pancake-toolkit
yarn
```

Then, refer to the readme of each project.
