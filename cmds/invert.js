const canvas = require("canvas");

module.exports = {
    name: 'invert',
    description: 'генерирует негатив картинки',
    aliases: ['inv'],
    usage: '<картинка>',
    async execute(client, message, args, prefix) {
        let embed;
        const urlArgs = args.join(" ").match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
        let image;
        if (message.attachments[0]) {
            image = message.attachments[0].url;
        } else if (!message.attachments[0]) {
            image = urlArgs[0];
        };
        if (!image) {
            embed = {
                title: `:warning: Картинка не обнаружена.`,
                description: `Введите \`${prefix}help demotivator\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
        else {
            const OK = await message.channel.createMessage(`:ok_hand:`);
            let img = await canvas.loadImage(image);
            let c = canvas.createCanvas(img.width, img.height)
            let ctx = c.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.globalCompositeOperation='difference';
            ctx.fillStyle='white';
            ctx.fillRect(0, 0, img.width, img.height);
            OK.delete();
            client.createMessage(message.channel.id, "", { name: "invert.png", file: c.toBuffer("image/png") })
        }
    }
}