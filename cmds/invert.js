const canvas = require("canvas");

module.exports = {
    name: 'invert',
    description: 'генерирует негатив картинки',
    usage: '<картинка>',
    async execute(client, message, args, prefix) {
        let embed;
        if (!message.attachments[0]) {
            embed = {
                title: `:warning: Картинка не обнаружена.`,
                description: `Введите \`${prefix}help invert\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
        else {
            let img = await canvas.loadImage(message.attachments[0].url);
            let c = canvas.createCanvas(img.width, img.height)
            let ctx = c.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.globalCompositeOperation='difference';
            ctx.fillStyle='white';
            ctx.fillRect(0, 0, img.width, img.height);
            client.createMessage(message.channel.id, "", { name: "invert.png", file: c.toBuffer("image/png") })
        }
    }
}