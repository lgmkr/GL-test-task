module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts"],
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.ts?$"
};
