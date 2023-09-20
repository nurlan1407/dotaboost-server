/** @type {import('ts-jest').JestConfigWithTsJest} */
const {pathsToModuleNameMapper} = require("ts-jest");

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths:['./'],
  moduleNameMapper: pathsToModuleNameMapper({
    "@App/*": [
      "src/*"
    ]
  }),
};