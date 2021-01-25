module.exports = {
    name: 'who',
    description: 'выбирает случайного пользователя',
    aliases: ['whois'],
    usage: `<что-то>`,
    guildOnly: true,
    async execute(client, message, args, prefix) {
        const randomUser = message.channel.guild.members.random().user.username;
        const subject = args.join(" ");
        const response = [
            `${randomUser}`,
            `Я думаю, что это ${randomUser}.`,
            `Я считаю, что это ${randomUser}.`,
            `Кажется, это ${randomUser}.`,
            `Кажется, ${randomUser} ${subject}.`,
            `Всё ясно, это ${randomUser}.`,
            `Всё ясно, ${randomUser} ${subject}.`,
            `Мои вычисления показывают, что это ${randomUser}.`,
            `Мой IQ подсказывает мне, что это ${randomUser}.`,
            `${randomUser} ${subject}!`,
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