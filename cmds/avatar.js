module.exports = {
    name: 'avatar',
    description: 'отображает аватарку пользователя',
    aliases: ['ava', 'icon', 'pfp'],
    usage: `[@ или ID пользователя]`,
    guildOnly: true,
    async execute(client, message, args, prefix) {
        const userID = args.join(" ");
        if (!userID) member = message.member;
        else member = message.channel.guild.members.get(message.mentions.length ? message.mentions[0].id : "") ||
        message.channel.guild.members.find(m => m.id === userID || m.username.toLowerCase() === userID.toLowerCase() || m.tag === userID) ||
        client.users.find(u => u.id === userID || u.tag === userID);
        if (!member) {
            return message.channel.createMessage(`Пользователь не найден.`);
        }
        const embed = {
            author: {
                name: `Аватарка ${member.username}#${member.discriminator}:`
            },
            color: 9502975,
            image: {
                url: member.avatarURL
            }
        }
        await message.channel.createMessage({embed});
    }
}