const { promisify } = require('util');

const exec = promisify(require('child_process').exec);

const execNodeScript = relativeScriptPath => {
  const scriptFile = require.resolve(relativeScriptPath);
  return exec(`node ${scriptFile}`);
};

const initDB = async () => {
  await execNodeScript('./initDB.js');
};

const resetDB = async () => {
  await execNodeScript('./resetDB.js');
};

module.exports = { initDB, resetDB };
