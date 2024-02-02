const fs = require('fs');
const terminal = require('../terminal')

const clientId = process.env.CLIENT_ID;

module.exports = (client) => {
    client.handlePrefixes = async (prefixFolders) => {
        if (!process.env.PREFIX) return terminal.debug('No prefix set in .env, disabling prefix module.')

        try {
            terminal.info(`Started refreshing prefix (${process.env.PREFIX}) commands.`);

            client.prefixArray = [];
            for (folder of prefixFolders) {
                const commandFiles = fs.readdirSync(`./src/prefixCommands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(`../prefixCommands/${folder}/${file}`);
                    client.prefixCommands.set(command.name, command);
                }
            }

            terminal.success(`Successfully reloaded prefix (${process.env.PREFIX}) commands.`);
        } catch (error) {
            terminal.error(error);
        }
    };
};