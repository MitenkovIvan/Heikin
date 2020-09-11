module.exports = {
    name: '8ball',
    description: 'отвечает на любой вопрос рандомом',
    aliases: ['8b'],
    usage: `<что-то>`,
    async execute(client, message, args, prefix) {
        const question = args.join(" ");
        const response = [
            `Да.`,
            `Нет.`,
            `Возможно.`,
            `Может быть.`,
            `Посмотрим.`,
            `Поживём - увидим.`,
            `Вряд ли.`,
            `Не-а.`,
            `Попробуй ещё раз.`,
            `На этот вопрос у меня нет ответа.`,
            `Я на такие вопросы не отвечаю.`,
            `Давай что-нибудь другое, я затрудняюсь ответить.`,
            `:zipper_mouth:`
        ];
        const answer = response[Math.floor(Math.random()*response.length)];
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
                        value: `${question}`,
                    },
                    {
                        name: `Ответ:`,
                        value: `${answer}`,
                    }
                ]
            }
            await message.channel.createMessage({embed});
        }
    }
}