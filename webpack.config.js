const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, './tsconfig.json'),
  ['auth-lib']
);

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For hosts (please adjust)
      // remotes: {
      //   "mfe1": "mfe1@http://localhost:3000/remoteEntry.js",
      // },

      shared: share({
        "@angular/core": { requiredVersion: "auto" },
        "@angular/common": { requiredVersion: "auto" },
        "@angular/router": { requiredVersion: "auto" },
        "rxjs": { requiredVersion: "auto" },
      })

    }),
    // Uncomment for sharing lib of an Angular CLI or Nx workspace
    sharedMappings.getPlugin(),
  ],
};

