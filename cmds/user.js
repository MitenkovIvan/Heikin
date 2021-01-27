const moment = require("moment");

module.exports = {
    name: 'user',
    description: 'отображает информацию о пользователе',
    aliases: ['userinfo', 'u'],
    usage: `[@ или ID пользователя]`,
    guildOnly: true,
    async execute(client, message, args, prefix) {
        let embed;
        let userID = args.join(" ");
        const tag = `${userID.username}#${userID.discriminator}`;
        let user;
        if (!userID) user = message.member;
        else user = message.channel.guild.members.get(message.mentions.length ? message.mentions[0].id : "") ||
        message.channel.guild.members.find(m => m.username.toLowerCase().startsWith(userID.toLowerCase()) ||
        m.tag && m.tag.toLowerCase().startsWith(userID.toLowerCase()) ||
        m.id && m.id.toLowerCase().startsWith(userID.toLowerCase()) ||
        m.nick && m.nick.toLowerCase().startsWith(userID.toLowerCase())) ||
        client.users.find(u => u.id === userID || u.username === userID ||
        u.discriminator === userID || u.tag === userID) || client.users.get(userID);

        if (!user) {
            embed = {
                title: `:warning: Пользователь не обнаружен.`,
                description: `Введите \`${prefix}help user\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
            return;
        } else {
            embed = {
                author: {
                    name: `${user.username}#${user.discriminator}`
                },
                color: 9502975,
                fields: [
                    {
                        name: `ID:`,
                        value: user.id
                    },
                    {
                        name: `Никнейм:`,
                        value: user ? (user.nick ? user.nick : "N/A") : "N/A"
                    },
                    {
                        name: `Бот?`,
                        value: user.bot ? "Да" : "Нет"
                    }
                ],
                footer: {
                    icon_url: client.user.avatarURL,
                    text: `Heikin © 2020-${client.currentYear} m1t3nk0v`
                },
                thumbnail: {
                    url: user.avatarURL
                }
            }
            if (user.status && user.status.length)
            embed.fields.push({
                name: `Статус:`,
                value: user.status
            });
            embed.fields.push({
                name: `Дата регистрации в Discord:`,
                value: `${moment(user.createdAt).format('ll')}, ${moment(user.createdAt).format('LTS')}`
            });
            embed.fields.push({
                name: `Дата присоединения к серверу:`,
                value: `${moment(user.joinedAt).format('ll')}, ${moment(user.joinedAt).format('LTS')}`
            });
            if (user.roles && user.roles.length)
            embed.fields.push({
                name: `Роли:`,
                value: user.roleObjects.sort((a, b) => b.position - a.position).map(r => r.mention).join(", ")
            });
        }
        await message.channel.createMessage({embed});
    }
}