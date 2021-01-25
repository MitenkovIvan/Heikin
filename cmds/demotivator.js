const canvas = require("canvas");
canvas.registerFont('./assets/fonts/Times New Roman.ttf', { family: 'Times New Roman' });
canvas.registerFont('./assets/fonts/arial.ttf', { family: 'arial' });

module.exports = {
    name: 'demotivator',
    description: 'генерирует демотиватор. Можно сгенерировать как обычный, так и белый, используя аргумент \`-w\`',
    aliases: ['dmtvtr'],
    usage: '[-w] "верхний текст" "нижний текст" <URL или вложение картинки>',
    async execute(client, message, args, prefix) {
        let embed;
        const cmdArgs = args.join(" ").match(/[-\w"]+/g);
        const textArgs = args.join(" ").match(/"([^"]*)"/g);
        const urlArgs = args.join(" ").match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
        if (!textArgs) {
            embed = {
                title: `:warning: Текст не указан.`,
                description: `Введите \`${prefix}help demotivator\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
        const topText = textArgs[0].replace(/^"|"$/g, '');
        if (!textArgs[1]) {
            embed = {
                title: `:warning: Нижний текст не указан.`,
                description: `Введите \`${prefix}help demotivator\` для получения инструкции по использованию этой команды.`,
                color: 9502975,
            };
            await message.channel.createMessage({embed});
        }
        const bottomText = textArgs[1].replace(/^"|"$/g, '');
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
            let c = canvas.createCanvas(1000, 1000);
            let ctx = c.getContext("2d");
            let img = await canvas.loadImage(image);
            ctx.textAlign = "center";
            if (cmdArgs[0] == "-w") {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, 1000, 1000);
                ctx.fillStyle = "black";
                ctx.fillRect(65, 40, 870, 745);
                ctx.fillStyle = "white";
                ctx.fillRect(68, 43, 864, 738);
                ctx.fillStyle = "black";
                ctx.fillRect(75, 50, 850, 725);
                ctx.font = "108px Times New Roman";
                ctx.fillText(topText, 500, 900, 900);
                ctx.font = "36px arial";
                ctx.fillText(bottomText, 500, 960, 900);
            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, 1000, 1000);
                ctx.fillStyle = "white";
                ctx.fillRect(65, 40, 870, 745);
                ctx.fillStyle = "black";
                ctx.fillRect(68, 43, 864, 738);
                ctx.fillStyle = "white";
                ctx.fillRect(75, 50, 850, 725);
                ctx.font = "108px Times New Roman";
                ctx.fillText(topText, 500, 900, 900);
                ctx.font = "36px arial";
                ctx.fillText(bottomText, 500, 960, 900);
            };
            ctx.drawImage(img, 75, 50, 850, 725);
            OK.delete();
            client.createMessage(message.channel.id, "", { name: "demotivator.png", file: c.toBuffer("image/png") })
        }
    }
}