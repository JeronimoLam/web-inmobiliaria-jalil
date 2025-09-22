module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFiles: ["<rootDir>/tests/config/jest.setup.ts"],
};
