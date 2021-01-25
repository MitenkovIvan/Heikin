module.exports = {
    name: 'reload',
    description: 'перезагружает команду',
    aliases: ['rel'],
    hidden: true,
    async execute(client, message, args, prefix) {
        const { commands } = client;
        const cmdName = args[0];
        const command = client.commands.get(cmdName) || client.commands.find(command => command.aliases && command.aliases.includes(cmdName));
        let embed;
        if (message.author.id !== process.env.dev) {
            embed = {
                title: `:no_entry: У вас нет прав на использование этой команды.`,
                color: 9502975,
            };
            return message.channel.createMessage({embed});
        }
        if (!args.length) {
            embed = {
                title: `:warning: Команда не указана.`,
                color: 9502975,
            };
            return message.channel.createMessage({embed});
        }
        if (!command) {
            embed = {
                title: `:warning: Такой команды не существует.`,
                color: 9502975,
            };
            return message.channel.createMessage({embed});
        }
        delete require.cache[require.resolve(`./${command.name}.js`)];
        try {
			const newCmd = require(`./${command.name}.js`);
			client.commands.set(newCmd.name, newCmd);
			embed = {
                title: `:white_check_mark: Команда \`${newCmd.name}\` успешно перезагружена!`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
		} catch (error) {
			console.log(error);
			embed = {
                title: `:no_entry: Что-то пошло не так.`,
                description: `\`\`\`js\n${error}\n\`\`\``,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
		}
    }
}