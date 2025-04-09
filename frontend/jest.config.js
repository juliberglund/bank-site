module.exports = {
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Aliases for src files
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy", // For CSS Modules
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js", // Non-module CSS imports
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$":
      "<rootDir>/__mocks__/fileMock.js", // Static assets
    "^@/components/(.*)$": "<rootDir>/components/$1", // Aliases for components
    "@next/font/(.*)": "<rootDir>/__mocks__/nextFontMock.js", // Mock next/font imports
    "next/font/(.*)": "<rootDir>/__mocks__/nextFontMock.js", // Mock next/font imports (alternative)
    "server-only": "<rootDir>/__mocks__/empty.js", // Mock server-only imports
  },
  // Setup files before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Centralized Jest setup file
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
