export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    // caso use CSS Modules
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  // Só importa se você quiser desativar as globals:
  // injectGlobals: false
};
