export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "^@/(.*)$": "./src/$1",
  },
};
