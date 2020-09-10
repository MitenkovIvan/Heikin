const Eris = require("eris");

module.exports = {
    name: 'eval',
    description: 'выполняет код на JavaScript',
    hidden: true,
    async execute(client, message, args, prefix) {
        let embed;
        if (message.author.id !== process.env.dev) {
            embed = {
                title: `:no_entry: У вас нет прав на использование этой команды.`,
                color: 9502975,
            };
            return message.channel.createMessage({embed});
        }
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            evaled = evaled.replace(/token.+/, `token: [Well, this is awkward. -_-]`);
            if (evaled.length >= 2000) {
                await client.createMessage(message.channel.id, "", { file: evaled, name: "result.txt" });
            }
            else {
                await message.channel.createMessage(`\`\`\`js\n${evaled}\n\`\`\``);
            }
        } catch (err) {
            console.log(err);
            embed = {
                title: `:no_entry: Что-то пошло не так.`,
                description: `\`\`\`js\n${err}\n\`\`\``,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
    }
}