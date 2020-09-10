module.exports = {
    name: 'help',
    description: 'отображает список команд бота и информацию о них',
    aliases: ['h'],
    usage: `[команда]`,
    async execute(client, message, args, prefix) {
        const { commands } = client;
        const cmdName = args[0];
        const command = client.commands.get(cmdName) || client.commands.find(command => command.aliases && command.aliases.includes(cmdName));
        let embed;
        if (!args.length) {
            const cmdList = commands.filter(command => !command.hidden).map(command => `\`${command.name}\``).join(', ')
            embed = {
                title: `Список команд:`,
                description: `${cmdList}`,
                color: 9502975,
                footer: {
                    icon_url: client.user.avatarURL,
                    text: `Введите ${prefix}help [команда] для получения подробной информации о команде.\nHeikin © 2020 m1t3nk0v`
                }
            };
            return message.channel.createMessage({embed});
        }
        if (!command || command.hidden) {
            embed = {
                title: `:warning: Такой команды не существует.`,
                description: `Введите \`${prefix}help\` для получения списка существующих команд.`,
                color: 9502975,
            };
            return message.channel.createMessage({embed});
        }
        let usage = `${prefix}${command.name}`;
        if (command.usage) {
            usage += ` ${command.usage}`
        }
        embed = {
            title: `\`${command.name}\``,
            description: `Эта команда ${command.description}.`,
            color: 9502975,
            fields: [
                {
                    name: `Как она работает?`,
                    value: `\`\`\`\n${usage}\n\`\`\``,
                },
            ],
            footer: {
                icon_url: client.user.avatarURL,
                text: "Heikin © 2020 m1t3nk0v"
            }
        };
        if (command.aliases) {
            embed.fields.push({
                name: `Также известна, как:`,
                value: command.aliases.map(a => `\`${a}\``).join(", ")
            });
        }
        await message.channel.createMessage({embed});
    }
}