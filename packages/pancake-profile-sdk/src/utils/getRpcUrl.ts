const getRandomIndex = () => {
  const lower = 0;
  const upper = 2;
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Array of available nodes to connect to
export const nodes = [
  "https://bsc-dataseed1.ninicoin.io",
  "https://bsc-dataseed1.defibit.io",
  "https://bsc-dataseed.binance.org",
];

const getNodeUrl = (): string => {
  const randomIndex = getRandomIndex();
  return nodes[randomIndex];
};

export default getNodeUrl;
