module.exports = {
    name: 'say',
    description: 'отправляет эмбед с вашим текстом',
    aliases: ['embed', 'echo'],
    usage: `<текст>`,
    async execute(client, message, args, prefix) {
        if (args.length === 0) {
            await message.channel.createMessage(`:zipper_mouth:`);
        }
        else {
            const text = args.join(" ");
            const embed = {
                description: `${text}`,
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: `${message.author.avatarURL}`
                },
                color: 9502975
            }
            message.delete();
            await message.channel.createMessage({embed});
        }
    }
}