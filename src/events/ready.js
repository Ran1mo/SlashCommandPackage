const terminal = require('../terminal')
const mongoose = require('mongoose')
const MongoDB = process.env.MONGO_DB;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        // MongoDB Connection
        if (!MongoDB) return;

        try {
            await mongoose.connect(MongoDB || '');
            terminal.success('Successfully connected to database✅');
        } catch (error) {
            terminal.error(`Error connecting to database: ${error.message}`);
        }
        // End of MongoDB Connection

        terminal.success(`Logged in as ${client.user.tag}`);

        async function pickPresence() {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },

                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};