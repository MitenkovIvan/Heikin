module.exports = {
    name: 'ping',
    description: 'проверяет пинг бота',
    async execute(client, message, args, prefix) {
        const pingCheck = await message.channel.createMessage(`:ping_pong: *Проверка...*`);
        const botLatency = pingCheck.timestamp - message.timestamp;
        var shard;
        if (message.guild) shard = client.shards.get(client.guildShardMap[message.guild.id]);
        else shard = client.shards.get(0);
        const embed = {
            title: `:ping_pong: Пинг: ${botLatency} мс`,
            description: `**Задержка API:** ${shard.latency} мс`,
            color: 9502975,
            footer: {
                icon_url: client.user.avatarURL,
                text: "Heikin © 2020 m1t3nk0v"
            }
        }
        await pingCheck.edit({content: "", embed});
    }
}