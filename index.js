const Eris = require("eris");
const client = new Eris(process.env.token);
const prefix = "m!";


client.on("ready", () => {
    console.log("Есть пробитие!");
    client.editStatus("online", {
        name: "m1t3nk0v.club | m!help",
        type: 2
    })
})

client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix) || message.author.client) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    switch (command) {
		case "8ball":
		    const question = args.join(" ");
			const response = [
				`Да.`,
				`Нет.`,
                `Возможно.`,
                `Может быть.`,
                `Посмотрим.`,
                `Поживём - увидим.`,
                `Вряд ли.`,
                `Не-а.`,
                `А чё?)`,
                `Попробуй ещё раз.`,
                `На этот вопрос у меня нет ответа.`,
                `Попробуй в Интернете найти, там этого полно.`,
                `Ищи сам ответ на свой вопрос!`,
                `НИХУЯ НЕ ПОНИМАЮ НИ ОДНОГО СЛОВА БЛЯТЬ КАРТАВАЯ СУКА`,
                `Это что за вопросы?!`,
                `Я на такие вопросы не отвечаю.`,
                `Давай что-нибудь другое, я затрудняюсь ответить.`,
                `Очень смешно)0)`,
                `Автор, ты сука?!`,
                `Не смешно.`,
                `А ты КВНщик или камедиклабер?`,
                `А зачем тебе это?`,
                `А оно тебе надо?)`,
                `В чём смысл этого вопроса?`,
                `Меньше знаешь - меньше... знаешь.`,
                `Вырастешь - узнаешь.`,
                `Тебе ещё рано это знать)`,
                `:flushed: Мммм... вот... нууу, кхм, пук.`,
                `:zipper_mouth:`
			];
            const answer = response[Math.floor(Math.random()*response.length)];
            if (args.length === 0) {
                client.createMessage(message.channel.id, `${message.author.mention} сначала вопрос придумай, а уже потом спрашивай -_-`);
            }
            else {
			client.createMessage(message.channel.id, {
                embed: {
                    author: {
                        name: `${message.author.username}`,
                        icon_url: `${message.author.avatarURL}`
                    },
                    color: 7237340,
                    footer: {
                        text: "© 2020 m1t3nk0v | Created with Eris.",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
					fields: [
                    {
                        name: "Вопрос:",
                        value: `${question}`,
                    },
                    {
                        name: "Ответ:",
                        value: `${answer}`,
                    }]
                }
            })};
            break;
			
		case "hello":
            client.createMessage(message.channel.id, `:wave: Привет, ${message.author.mention}!`);
            break;

        case "help":
            client.createMessage(message.channel.id, {
                embed: {
                    title: "СПИСОК КОМАНД",
                    description: "`m!8ball <question>` - задать вопрос боту\n`m!hello` - передать привет боту\n`m!help` - список команд **(вы здесь)**\n`m!invite` - добавить бота на свой сервер\n`m!kotletki` - местный !ping\n`m!reverse <text>` - отправить текст наоборот от имени бота\n`m!say <text>` - отправить текст от имени бота\n\n**Список будет дополняться по мере появления новых команд.**",
                    author: {
                        name: "m1t3nk0v.b0t",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    color: 7237340,
                    footer: {
                        text: "© 2020 m1t3nk0v | Created with Eris.",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    }
                }
            });
            break;

        case "invite":
            if (message.author.id === "425356730483081227") {
                client.createMessage(message.channel.id, `${message.author.mention} а жопа не слипнется?)`);
            }
            else {
            client.createMessage(message.channel.id, `**Ссылка на бота:** https://discordapp.com/oauth2/authorize?client_id=702412548347134022&scope=bot&permissions=8`);
            }
            break;

        case "kotletki":
            if (message.author.id === "425356730483081227") {
                client.createMessage(message.channel.id, `${message.author.mention} сасай, никаких тебе котлеток)`);
            }
            else {
            client.createMessage(message.channel.id, `котлетки`);
            }
            break;

        case "reverse":
            if (args.length === 0) {
                client.createMessage(message.channel.id, `***(яиначлом икувз)***`);
            }
            if (message.author.id === "425356730483081227") {
                client.createMessage(message.channel.id, `${message.author.mention} ьше алоп с уде ёще ,еонреван ,имакчобокс ясьшеавыркирп ,охолп ьшитуш ,упож в иди`);
            }
            else {
                const text = args.join(" ");
                const reverse = text.split("").reverse().join("")
                client.createMessage(message.channel.id, `${reverse}`);
                if (message.content === `m!reverse ${text}`) {
                    message.delete();
                    console.log(`${message.author.username} сказал: ${reverse} (расшифровка: ${text})`);
                }
            }
            break;

        case "say":
            if (args.length === 0) {
                client.createMessage(message.channel.id, `***(звуки молчания)***`);
            }
            if (message.author.id === "425356730483081227") {
                client.createMessage(message.channel.id, `${message.author.mention} иди в жопу, шутишь плохо, прикрываешься скобочками, наверное, ещё еду с пола ешь`);
            }
            else {
                const text = args.join(" ");
                client.createMessage(message.channel.id, `${text}`);
                if (message.content === `m!say ${text}`) {
                    message.delete();
                    console.log(`${message.author.username} сказал: ${text}`);
                }
            }
            break;

        default:
            break;
    }
})

client.connect();
