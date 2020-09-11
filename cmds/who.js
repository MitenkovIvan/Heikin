module.exports = {
    name: 'who',
    description: 'выбирает случайного пользователя',
    aliases: ['whois'],
    usage: `<что-то>`,
    guildOnly: true,
    async execute(client, message, args, prefix) {
        const randomID = message.channel.guild.members.random().user.id;
        const subject = args.join(" ");
        const response = [
            `<@${randomID}>`,
            `Я думаю, что это <@${randomID}>.`,
            `Я считаю, что это <@${randomID}>.`,
            `Кажется, это <@${randomID}>.`,
            `Кажется, <@${randomID}> ${subject}.`,
            `Всё ясно, это <@${randomID}>.`,
            `Всё ясно, <@${randomID}> ${subject}.`,
            `Мои вычисления показывают, что это <@${randomID}>.`,
            `Мой IQ подсказывает мне, что это <@${randomID}>.`
        ];
        const randomResponse = response[Math.floor(Math.random()*response.length)];
        if (args.length === 0) {
            await message.channel.createMessage(`:zipper_mouth:`);
        }
        else {
            const embed = {
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: `${message.author.avatarURL}`
                },
                color: 9502975,
                fields: [
                    {
                        name: `Вопрос:`,
                        value: `Кто ${subject}?`,
                    },
                    {
                        name: `Ответ:`,
                        value: `${randomResponse}`,
                    }
                ]
            }
            await message.channel.createMessage({embed});
        }
    }
}