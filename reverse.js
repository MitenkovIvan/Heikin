module.exports = {
    name: 'reverse',
    description: 'отправляет эмбед с реверсом вашего текста',
    aliases: ['yas', 'debme', 'ohce', 'rev'],
    usage: `<текст>`,
    async execute(client, message, args, prefix) {
        if (args.length === 0) {
            client.createMessage(message.channel.id, `...`);
        }
        else {
            const text = args.join(" ");
            const reverse = text.split("").reverse().join("")
            const embed = {
                description: `${reverse}`,
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: `${message.author.avatarURL}`
                },
                color: 9502975
            }
            await message.channel.createMessage({embed});
        }
    }
}