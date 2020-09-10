const canvas = require("canvas");
canvas.registerFont('./assets/fonts/Times New Roman.ttf', { family: 'Times New Roman' });
canvas.registerFont('./assets/fonts/arial.ttf', { family: 'arial' });

module.exports = {
    name: 'demotivator',
    description: 'генерирует демотиватор',
    usage: '"верхний текст" "нижний текст" <картинка>',
    async execute(client, message, args, prefix) {
        let embed;
        const regExp = /"([^"]*)"/g;
        const textArgs = args.join(" ").match(regExp);
        if (!textArgs) {
            embed = {
                title: `:warning: Текст некорректно указан или не указан вовсе.`,
                description: `Введите \`${prefix}help demotivator\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
        const topText = textArgs[0].replace(/^"|"$/g, '');
        if (message.content === `${prefix}demotivator "${topText}"`) {
            embed = {
                title: `:warning: Нижний текст не указан.`,
                description: `Введите \`${prefix}help demotivator\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
        const bottomText = textArgs[1].replace(/^"|"$/g, '');
        if (!message.attachments[0]) {
            embed = {
                title: `:warning: Картинка не обнаружена.`,
                description: `Введите \`${prefix}help demotivator\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
        else {
            let c = canvas.createCanvas(1000, 1000)
            let ctx = c.getContext("2d");
            let img = await canvas.loadImage(message.attachments[0].url);
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1000, 1000);
            ctx.fillStyle = "white";
            ctx.fillRect(65, 40, 870, 745);
            ctx.fillStyle = "black";
            ctx.fillRect(68, 43, 864, 738);
            ctx.fillStyle = "white";
            ctx.fillRect(75, 50, 850, 725);
            ctx.font = "108px Times New Roman";
            ctx.fillText(topText, 500, 900);
            ctx.font = "36px arial";
            ctx.fillText(bottomText, 500, 960);
            ctx.drawImage(img, 75, 50, 850, 725);
            client.createMessage(message.channel.id, "", { name: "demotivator.png", file: c.toBuffer("image/png") })
        }
    }
}