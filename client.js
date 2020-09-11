require("dotenv").config();
const Eris = require("eris");
const moment = require("moment");
const fs = require("fs");
const client = new Eris(process.env.token);
const prefixes = ['h:', 'h!', 'hk!', 'heikin!'];
const prefixRegex = new RegExp(`^(${prefixes.join('|')})`);

client.version = `1.0.3 (2020-09-11)`
client.options.defaultImageFormat = "png";
client.options.defaultImageSize = "4096";

client.commands = new Eris.Collection();
const cmds = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
for (const file of cmds) {
	const command = require(`./cmds/${file}`);
	client.commands.set(command.name, command);
}

client.on("ready", () => {
    moment.locale('ru');
    console.log(`平均\nHEIKIN\n(average)\n\n${client.version}\nby m1t3nk0v\n\nWelcome!`);
    client.editStatus("dnd", {
        name: "h:help",
        type: 0
    })
})

client.on("messageCreate", message => {
    let prefix = message.content.match(prefixRegex);
    for(const thisPrefix of prefixes) {
        if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
    }
    if (!prefix) return;
    if (!message.channel.guild || message.author.client) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = client.commands.get(cmdName) || client.commands.find(command => command.aliases && command.aliases.includes(cmdName));
    if (!command) return;
    else {
        try {
            command.execute(client, message, args, prefix);
        } catch (err) {
            console.error(err);
            embed = {
                title: `:no_entry: Что-то пошло не так.`,
                description: `\`\`\`js\n${err}\n\`\`\``,
                color: 9502975,
            };
            message.channel.createMessage({embed});
        }
    }
})

client.connect();