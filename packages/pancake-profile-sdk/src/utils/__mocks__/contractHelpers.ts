/* eslint-disable @typescript-eslint/no-unused-vars */
import Web3 from "web3";
import { existingAddress1, nonexistentAddress } from "../../mocks/mockAddresses";

const getProfileContract = jest.fn((web3?: Web3) => {
  return {
    methods: {
      hasRegistered: jest.fn((callAddress: string) => {
        if (callAddress === existingAddress1) {
          return { call: jest.fn(() => Promise.resolve(true)) };
        }
        return { call: jest.fn(() => Promise.resolve(false)) };
      }),
      getUserProfile: jest.fn((callAddress: string) => {
        if (callAddress === existingAddress1) {
          return {
            call: jest.fn(() =>
              Promise.resolve({
                0: 123,
                1: 3000,
                2: 2,
                3: "0x4444444444444444444444444444444444444444",
                4: 555,
                5: true,
              })
            ),
          };
        }
        return { call: jest.fn(() => Promise.resolve(null)) };
      }),
      getTeamProfile: jest.fn((teamId: number) => {
        if (teamId === 2) {
          return {
            call: jest.fn(() =>
              Promise.resolve({
                0: "Fearsome Flippers",
                2: 77000,
                3: 341500,
                4: true,
              })
            ),
          };
        }
        return { call: jest.fn(() => Promise.resolve(null)) };
      }),
    },
  };
});

const getPancakeRabbitContract = jest.fn((web3?: Web3) => {
  return {
    methods: {
      getBunnyId: jest.fn((callAddress: string) => {
        return { call: jest.fn(() => Promise.resolve("5")) };
      }),
    },
  };
});

module.exports = { getProfileContract, getPancakeRabbitContract };
