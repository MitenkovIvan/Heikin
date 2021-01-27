module.exports = {
    name: 'avatar',
    description: 'отображает аватарку пользователя',
    aliases: ['ava', 'icon', 'pfp', 'a'],
    usage: `[@ или ID пользователя]`,
    guildOnly: true,
    async execute(client, message, args, prefix) {
        let embed;
        let userID = args.join(" ");
        let user;
        if (userID === "server") {
            embed = {
                author: {
                    name: `Аватарка сервера ${message.channel.guild.name}:`
                },
                color: 9502975,
                image: {
                    url: message.channel.guild.iconURL
                }
            }
            await message.channel.createMessage({embed});
        } else {
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
                    description: `Введите \`${prefix}help avatar\` для получения инструкции по использованию этой команды.`,
                    color: 9502975,
                };
                await message.channel.createMessage({embed});
                return;
            } else {
                embed = {
                    author: {
                        name: `Аватарка ${user.username}#${user.discriminator}:`
                    },
                    color: 9502975,
                    image: {
                        url: user.avatarURL
                    }
                }
            }
            await message.channel.createMessage({embed});
        }
    }
}