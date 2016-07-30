const constants = require('../constants');
const utils = require('../utils');

var help = (cmd) => {
  const commands = require('./index');

  if (commands[cmd] && commands[cmd].docs) {
    utils.markdownLog(commands[cmd].docs.trim());
    return Promise.resolve();
  }
  console.log(`
Usage: zapier COMMAND [command-specific-arguments] [--command-specific-options]

This Zapier command works off of two files:

 * ${constants.AUTH_LOCATION}      (home directory identifies the deploy key & user)
 * ./${constants.CURRENT_APP_FILE}   (current directory identifies the app)

The \`zapier auth\` and \`zapier create\`/\`zapier link\` commands will help manage those files. All commands listed below.
`.trim());
  return Promise.resolve({})
    .then(() => {
      console.log('');
      var allCommands = Object.keys(commands).map((command) => {
        return {
          name: command,
          help: commands[command].help,
          example: commands[command].example
        };
      });
      utils.printData(allCommands, [
        ['Command', 'name'],
        ['Example', 'example'],
        ['Help', 'help'],
      ]);
    });
};
help.help = 'Lists all the commands you can use.';
help.example = 'zapier help';
help.docs = `\
You need help using help?

    (╯°□°）╯︵ ┻━┻
`;

module.exports = help;