const fetch = require('node-fetch');

module.exports = {
    name: 'dsay',
    description: 'отправляет текст разработчика от лица бота',
    hidden: true,
    async execute(client, message, args, prefix) {
        let embed;
        let text = args.join(" ");
        const urlArgs = args.join(" ").match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
        if (message.author.id !== process.env.dev) {
            embed = {
                title: `:no_entry: У вас нет прав на использование этой команды.`,
                color: 9502975,
            };
            return message.channel.createMessage({embed});
        }
        try {
            let files = [];
            for (const attachment of message.attachments) {
                let file;
                if (message.attachments[0]) {
                    file = message.attachments[0].url;
                } else if (!message.attachments[0]) {
                    file = urlArgs[0];
                };
                const fileBuffer = await fetch(file).then(r => r.buffer());
                files.push({
                  name: attachment.filename,
                  file: fileBuffer,
                });
            };
            await message.delete();
            await client.createMessage(message.channel.id, text, files);
        } catch {};
    }
}