const fs = require('fs');

module.exports = (on, config) => {
  on('task', {
    writeToFile({ filename, content }) {
      fs.writeFileSync(filename, JSON.stringify(content, null, 2));
      return null;
    },
  });
};
