const moment = require("moment");

module.exports = {
    name: 'user',
    description: 'отображает информацию о пользователе',
    aliases: ['userinfo'],
    usage: `[@ или ID пользователя]`,
    guildOnly: true,
    async execute(client, message, args, prefix) {
        let userID = args.join(" ");
        if (!userID) member = message.member;
        else member = message.channel.guild.members.get(message.mentions.length ? message.mentions[0].id : "") ||
        message.channel.guild.members.find(m => m.id === userID || m.username.toLowerCase() === userID.toLowerCase() || m.tag === userID) ||
        client.users.find(u => u.id === userID || u.tag === userID);
        if (!member) {
            return message.channel.createMessage(`Пользователь не найден.`);
        }
        const embed = {
            author: {
                name: `${member.username}#${member.discriminator}`,
                icon_url: member.avatarURL
            },
            color: 9502975,
            fields: [
                {
                    name: `**ID:**`,
                    value: member.id
                },
                {
                    name: `**Никнейм:**`,
                    value: member ? (member.nick ? member.nick : "N/A") : "N/A"
                },
                {
                    name: `**Статус:**`,
                    value: member.status,
                    inline: true
                },
                {
                    name: `**Бот?**`,
                    value: member.bot ? "Да" : "Нет",
                    inline: true
                },
                {
                    name: `**Дата регистрации в Discord:**`,
                    value: `${moment(member.createdAt).format('ll')}, ${moment(member.createdAt).format('LTS')}`
                },
                {
                    name: `**Дата присоединения к серверу:**`,
                    value: `${moment(member.joinedAt).format('ll')}, ${moment(member.joinedAt).format('LTS')}`
                }
            ],
            footer: {
                icon_url: client.user.avatarURL,
                text: "Heikin © 2020 m1t3nk0v"
            },
            thumbnail: {
                url: member.avatarURL
            }
        }
        await message.channel.createMessage({embed});
    }
}