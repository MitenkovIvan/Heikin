const { TextChannel, VoiceChannel, CategoryChannel} = require("eris");
const moment = require("moment");

module.exports = {
    name: 'server',
    description: 'отображает информацию о сервере',
    aliases: ['srv', 'srvinfo', 'srvstat'],
    guildOnly: true,
    verificationLevel: [
        "Отсутствует",
        "Низкий",
        "Средний",
        "Высокий",
        "Очень высокий",
    ],
    async execute(client, message, args, prefix) {
        const owner = message.channel.guild.members.get(message.channel.guild.ownerID);
        const ownerTag = `${owner.username}#${owner.discriminator}`
        const embed = {
            author: {
                name: message.channel.guild.name,
                icon_url: message.channel.guild.iconURL
            },
            color: 9502975,
            fields: [
                {
                    name: `ID:`,
                    value: message.channel.guild.id,
                    inline: true
                },
                {
                    name: `Владелец сервера:`,
                    value: `${ownerTag}`,
                    inline: true
                },
                {
                    name: `Регион сервера:`,
                    value: message.channel.guild.region,
                    inline: true
                },
                {
                    name: `Уровень проверки:`,
                    value: this.verificationLevel[message.channel.guild.verificationLevel],
                    inline: true
                },
                {
                    name: `Дата создания:`,
                    value: `${moment(message.channel.guild.createdAt).format('ll')}, ${moment(message.channel.guild.createdAt).format('LTS')}`,
                    inline: true
                },
                {
                    name: `Каналов:`,
                    value: `Всего: ${message.channel.guild.channels.size}\n`
                    + `Текстовых: ${message.channel.guild.channels.filter(c => c instanceof TextChannel).length}\n`
                    + `Голосовых: ${message.channel.guild.channels.filter(c => c instanceof VoiceChannel).length}\n`
                    + `Категорий: ${message.channel.guild.channels.filter(c => c instanceof CategoryChannel).length}\n`,
                },
                {
                    name: `Пользователей:`,
                    value: `Всего: ${message.channel.guild.memberCount}\n`
                    + `В сети: ${message.channel.guild.members.filter(m => m.status === "online").length}\n`
                    + `Не активны: ${message.channel.guild.members.filter(m => m.status === "idle").length}\n`
                    + `Заняты: ${message.channel.guild.members.filter(m => m.status === "dnd").length}\n`
                    + `Не в сети: ${message.channel.guild.members.filter(m => m.status === "offline").length}\n`
                    + `Ботов: ${message.channel.guild.members.filter(m => m.bot).length}`,
                }
            ],
            footer: {
                icon_url: client.user.avatarURL,
                text: "Heikin © 2020 m1t3nk0v"
            },
            thumbnail: {
                url: message.channel.guild.iconURL
            }
        }
        await message.channel.createMessage({embed});
    }
}