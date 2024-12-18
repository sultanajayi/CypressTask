const fs = require('fs');
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,
    experimentalWebKitSupport: true,
    experimentalRunAllSpecs: true,
    includeShadowDom: true,
    chromeWebSecuritySupport: true,
    viewportHeight: 800,
    viewportWidth: 1500,
    watchForFileChanges: true,
    setupNodeEvents(on, config) {
      // Register the custom 'writeToFile' task
      on('task', {
        writeToFile({ filename, content }) {
          try {
            // Write the content to the specified file
            fs.writeFileSync(filename, JSON.stringify(content, null, 2));
            return null; // Return null to indicate success
          } catch (error) {
            // Log the error if the write operation fails
            console.error('Error writing to file:', error);
            throw error;
          }
        },
      });

      return config; 
    },
  },
});
