const Eris = require("eris");
const moment = require("moment");
const canvas = require("canvas");
const client = new Eris(process.env.token);
const version = require("./package.json").version;
const currentYear = moment().format('YYYY');
const os = require("os");
const prefix = "m!";

client.on("ready", () => {
    moment.locale('ru');
    console.log("Есть пробитие!");
    client.editStatus("online", {
        name: "Visual Studio Code | m!help",
        type: 0
    })
})

client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix) || message.author.client) return;
    if (!message.channel.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const getUser = message.mentions.length >= 1 ? message.mentions[0] : (args.length !== 0 ? client.users.get(args[0]) : message.author);
    const user = getUser !== undefined ? getUser : (message.author);
    const member = message.channel.guild.members.get(user.id);
    const randomMemberID = message.channel.guild.members.random().user.id;

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
                `Ты глупый или что-то?`,
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
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: `${message.author.avatarURL}`
                    },
                    color: 7237340,
                    footer: {
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    fields: [
                    {
                        name: `**Вопрос:**`,
                        value: `${question}`,
                    },
                    {
                        name: `**Ответ:**`,
                        value: `${answer}`,
                    }]
                }
            })};
            break;

        case "avatar":
            client.createMessage(message.channel.id, {
                embed: {
                    description: `Аватарка **${member.username}#${member.discriminator}**:`,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    color: 7237340,
                    footer: {
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    image: {
                        url: member.avatarURL
                    }
                }
            });
            break;
            
        case "demotivator":
            const regExp = /"([^"]*)"/g;
            const textArgs = args.join(" ").match(regExp);
            if (!textArgs) {
                client.createMessage(message.channel.id, `${message.author.mention} ты точно всё правильно делаешь? (спойлер: используй "кавычки")`);
            }
            (async function run() {
                const topText = textArgs[0].replace(/^"|"$/g, '');
                if (message.content === `${prefix}demotivator "${topText}"`) {
                    client.createMessage(message.channel.id, `${message.author.mention} а нижний текст?`);
                }
                const bottomText = textArgs[1].replace(/^"|"$/g, '');
                if (!message.attachments[0]) {
                    client.createMessage(message.channel.id, `${message.author.mention} а картинка где?`);
                }
                else {
                    let c = canvas.createCanvas(1000, 1000)
                    let ctx = c.getContext("2d");
                    let img = await canvas.loadImage(message.attachments[0].url);
                    ctx.font = "108px Times New Roman";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "black";
                    ctx.fillRect(0, 0, 1000, 1000);
                    ctx.fillStyle = "white";
                    ctx.fillRect(65, 40, 870, 745);
                    ctx.fillStyle = "black";
                    ctx.fillRect(68, 43, 864, 738);
                    ctx.fillStyle = "white";
                    ctx.fillRect(75, 50, 850, 725);
                    ctx.fillText(topText, 500, 890);
                    ctx.font = "48px Times New Roman";
                    ctx.fillText(bottomText, 500, 950);
                    ctx.drawImage(img, 75, 50, 850, 725);
                    client.createMessage(message.channel.id, "", { name: "demotivator.png", file: c.toBuffer("image/png") })
                }
            })();
            break;
            
        case "eval":
            if (message.author.id !== "274551672301158402") {
                client.createMessage(message.channel.id, `${message.author.mention} тебе сюда нельзя`);
            }
            else {
                try {
                    const code = args.join(" ");
                    const proc = eval(code);
                    const result = `\`\`\`js\n${proc}\n\`\`\``;
                    client.createMessage(message.channel.id, `${result}`);
                    return result;
                } catch (err) {
                    client.createMessage(message.channel.id, `${err}`);
                }
            }
            break;

        case "hello":
            client.createMessage(message.channel.id, `:wave: Привет, ${message.author.mention}!`);
            break;

        case "help":
            client.createMessage(message.channel.id, {
                embed: {
                    title: "СПИСОК КОМАНД",
                    description: "`m!8ball <question>` - задать вопрос боту\n`m!avatar [user]` - аватарка пользователя\n`m!demotivator <topText> <bottomText> <image>` - создать демотиватор\n`m!hello` - передать привет боту\n`m!help` - список команд **(вы здесь)**\n`m!info` - узнать информацию о боте\n`m!invite` - добавить бота на свой сервер\n`m!kotletki` - местный !ping\n`m!rate <smth>` - дать оценку какому-либо предмету\n`m!reverse <text>` - отправить текст наоборот от имени бота\n`m!say <text>` - отправить текст от имени бота\n`m!server` - узнать информацию о сервере\n`m!user [user]` - узнать информацию о пользователе\n`m!who <subject>` - система поиска человека\n\n**Список будет дополняться по мере появления новых команд.**",
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    color: 7237340,
                    footer: {
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    }
                }
            });
            break;

        case "info":
            client.createMessage(message.channel.id, {
                embed: {
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    color: 7237340,
                    fields: [
                        {
                          name: `**ID:**`,
                          value: client.user.id
                        },
                        {
                          name: `**Аптайм:**`,
                          value: `${moment(client.uptime).format('LTS')}`
                        },
                        {
                          name: `**Операционная система:**`,
                          value: `${os.type()} ${os.release()} (${os.arch()})`
                        },
                        {
                          name: `**Дата создания:**`,
                          value: `${moment(client.user.createdAt).format('ll')}, ${moment(client.user.createdAt).format('LTS')}`
                        },
                        {
                          name: `**Количество серверов:**`,
                          value: client.guilds.size
                        },
                        {
                          name: `**Количество участников:**`,
                          value: client.users.size
                        },
                        {
                          name: `**Используемые пакеты:**`,
                          value: `**Node.js** ${process.version}\n**Eris** ${require("eris").VERSION}\n**Moment** ${moment.version}\n**Canvas** ${canvas.version}`
                        }
                    ],
                    footer: {
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    thumbnail: {
                        url: client.user.avatarURL
                    }
                }
            });
            break;

        case "invite":
            if (message.author.id === "635445518553710593") {
                client.createMessage(message.channel.id, `${message.author.mention} а жопа не слипнется?)`);
            }
            else {
            client.createMessage(message.channel.id, `**Ссылка на бота:** https://discordapp.com/oauth2/authorize?client_id=702412548347134022&scope=bot&permissions=8`);
            }
            break;

        case "kotletki":
            if (message.author.id === "635445518553710593") {
                client.createMessage(message.channel.id, `${message.author.mention} сасай, никаких тебе котлеток)`);
            }
            else {
            client.createMessage(message.channel.id, {
                "content": "котлетки",
                "embed": {
                  "description": `:ping_pong: **Пинг:** ${message.channel.guild.shard.latency} мс`,
                  "color": 7237340,
                  "footer": {
                    "icon_url": "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png",
                    "text": "© 2020 m1t3nk0v"
                  }
                }
              });
            }
            break;

        case "rate":
            const subject = args.join(" ");
            const comment = [
                `**?/10**\nПацанчики, объясните мем чайнику.`,
                `**?/10**\nЯ ничего не понял.`,
                `**undefined/10**\nundefined`,
                `**-10/10**\nNot funny, didn't laugh.`,
                `**-10/10**\nBruh)`,
                `**0/10**\nNot funny, didn't laugh.`,
                `**0/10**\nBruh)`,
                `**0/10**\nА ты КВНщик или камедиклабер?`,
                `**0/10**\nНе смешно.`,
                `**0/10**\nОго! Пошёл нахуй!`,
                `**0/10**\nНИХУЯ НЕ ПОНИМАЮ НИ ОДНОГО СЛОВА БЛЯТЬ КАРТАВАЯ СУКА`,
                `**0/10**\nОткрыто достижение "Хуйню сморозил"!`,
                `**0/10**\nВставай, ты опять обосрался.`,
                `**0/10**\nЧувак, ты думал, что-то здесь будет?`,
                `**0/10**\nЯ, конечно, не указатель, но иди нахуй с такими приколами.`,
                `**0/10**\nВы самое слабое звено, прощайте.`,
                `**0/10**\nО. Круто. Да. Классно. Держи в курсе. Вау. Ого. Ага. Блин. Не знал. Вау. А что ещё знаешь? Как? Я записываю, повтори. Круто. Кайф. Офигеть.`,
                `**1/10**\n:star: there was an attempt`,
                `**1/10**\nХорошая попытка.`,
                `**1/10**\nКазахстан угрожает тебе бомбардировкой.`,
                `**1/10**\nБЛЯДЬ! Я тебя захуярю!`,
                `**1/10**\nЯ тебя сука вычислю по айпи и убью`,
                `**1/10**\n:candle: *Похуй...*`,
                `**1/10**\n:candle: *пиздец*`,
                `**1/10**\nВыглядит так, будто Артёмка Лебедев покакал.`,
                `**1/10**\n:knife: иди сюда...`,
                `**1/10**\nЧел.`,
                `**1/10**\nНихуя ты умный.`,
                `**1/10**\nебать жопа долбанула бляяяя че ты так тролишь жестко`,
                `**1/10**\nя смотрю ты ахуел`,
                `**1/10**\nПрикол не оценили, в изолятор, долбоёб.`,
                `**1/10**\nBro! You just posted cringe!`,
                `**1/10**\nЧел, ты запостил кринж. Такое не прощают.`,
                `**1/10**\nТы дохуя умный? Пиздим его, ребят.`,
                `**1/10**\nТы дохуя смешной? Пиздим его, ребят.`,
                `**1/10**\nА голову ты не забыл?`,
                `**1/10**\nА завали-ка ебало.`,
                `**1/10**\nЭто как понимать, паскуда? А?!`,
                `**1/10**\nа я чота щас прикола совсем не понял блять`,
                `**1/10**\nТы чо городишь, дядь? Совсем обубенился? За языком-то следи.`,
                `**1/10**\nА нахуя мне эта информация?`,
                `**1/10**\nГляньте, чё несёт, дурной.`,
                `**1/10**\nХорошо пошутил, выезжаем.`,
                `**1/10**\nFBI, OPEN UP!!!`,
                `**2/10**\nС родителями в школу!`,
                `**2/10**\nИди лучше уроки учи.`,
                `**2/10**\nНихуя себе, садись, 2!`,
                `**2/10**\nНу нихуя чё выдал садись 2`,
                `**2/10**\nДа пошла ты нахуй, ошибка природы.`,
                `**2/10**\nГениально, просто гениально, иди нахуй!`,
                `**2/10**\nНу всё, теперь оглядывайся на улице, ебалай.`,
                `**2/10**\nРот закрой, не позорься.`,
                `**2/10**\nshit i got cyberbullied`,
                `**2/10**\nСпасибо за кибербуллинг.`,
                `**2/10**\nА что, звучит хайпово.`,
                `**2/10**\nДа иди ты нахуй со своими буквами!`,
                `**2/10**\nНам не интересно, замолчи.`,
                `**2/10**\nБУНД БЛЯДЬ!`,
                `**2/10**\nВсё ясно, автору 10 лет...`,
                `**2/10**\nПацанчик, ты как-то не в то направление шутишь.`,
                `**2/10**\nТы не туда воюешь.`,
                `**2/10**\nС такими приколами тебе в Одноклассники.`,
                `**2/10**\nЗвучит сомнительно (хуёво).`,
                `**3/10**\nнорм прикол но садись 3 за то что ты прихуел`,
                `**3/10**\nА почему рот в говне?`,
                `**3/10**\nТакие дела, соси хуй, быдло.`,
                `**3/10**\nТвой член погиб, миссия выполнена неудачно.`,
                `**3/10**\nум ваче сей(`,
                `**3/10**\nа ты сам чо блядь умный уебок блядь за слова отвечай`,
                `**3/10**\nКакая трогательная история! Жалко, что пиздёж...`,
                `**3/10**\nЗвучит неправдеподобно, я в это не верю.`,
                `**3/10**\nВ таких моментах не стоит ничего говорить, а только бросить загадочный взгляд в мексиканской шляпе.`,
                `**3/10**\nвотофак мазафак`,
                `**3/10**\nа я чота щас прикола нихуя не понял блять`,
                `**3/10**\n:candle: *Ну немножко не похуй, конечно, но похуй...*`,
                `**3/10**\nФу блять`,
                `**3/10**\nЭто фотошоп, я programmist, меня не обманешь!`,
                `**4/10**\nНа такое у меня нет аргументов.`,
                `**4/10**\nВообще-то не смешно.`,
                `**4/10**\nЧувак, и это, по-твоему, смешно?`,
                `**4/10**\nААААА БЛЯДЬ`,
                `**4/10**\nТы гнида блядь, заткнись.`,
                `**4/10**\nИ что, по головке погладить? Снимай штаны, заебал.`,
                `**4/10**\nПочему так нахуй? Был бы ты человек нахуй...`,
                `**4/10**\nТак, алё, я не понял, это чё?!`,
                `**4/10**\nА пятый где? Ладно.`,
                `**5/10**\nнехуя садись пять 5`,
                `**5/10**\nну нихуя чё выдал садись 5`,
                `**5/10**\nДавай пять!`,
                `**5/10**\nПятёрочка выручает!`,
                `**5/10**\nПятёрочка нихуя не выручает!`,
                `**5/10**\nОжидаемо.`,
                `**5/10**\noh dear`,
                `**5/10**\nА дальше чё?`,
                `**5/10**\nЭто programmist, я фотошоп!`,
                `**6/10**\nёпаресете)`,
                `**6/10**\nА чё?)`,
                `**6/10**\nЧто это было, Пух?`,
                `**6/10**\nОп ахах)`,
                `**7/10**\nУ меня нет слов.`,
                `**8/10**\nФеноменально.`,
                `**9/10**\nAh shit, here we go again.`,
                `**9/10**\nПо фактам, хули.`,
                `**9/10**\nУх сука, сос мыслом.`,
                `**10/10**\nКак тебе такое, Илон Маск?)`,
                `**10/10**\nВот это интеллект, молодчинка, США в шоке!!!`,
                `**10/10**\nВсё, выключай, у меня хуй встал.`,
                `**10/10**\nСпасибо, подрочил.`,
                `**10/10**\nСука, опять дрочить! Только что дрочил, суки!!`,
                `**10/10**\nабалдеть блять`,
                `**10/10**\n:candle: *Я покакал...*`,
                `**10/10**\n:candle: *Я покекал...*`,
                `**10/10**\n:candle: *Я кончил...*`,
                `**10/10**\nАхуеть спасибо папаша :flushed:`,
                `**10/10**\nВот тут даже я охуел.`,
                `**10/10**\nЗвучит правдеподобно, я в это верю.`,
                `**10/10**\nВот это РЕАЛЬНО смешная постирония, учитесь, ребята!)`,
                `**10/10**\nЭто не фотошоп, я такое видел в горах Краснодарского края!`,
                `**10/10**\nЛя, какая цаца!`,
                `**10/10**\nНихуёвая чикса для чпоканья! :flushed:`,
                `**11/10**\nGood game, well played!`,
                `**100/10**\n:flushed: нефига себя иди на хуй`,
                `**100/10**\nОп ахах неловко вышло)`
            ];
            const rate = comment[Math.floor(Math.random()*comment.length)];
            if (args.length === 0) {
                client.createMessage(message.channel.id, `${message.author.mention} ну давай, удиви меня`);
            }
            else {
            client.createMessage(message.channel.id, {
                embed: {
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,
                        icon_url: `${message.author.avatarURL}`
                    },
                    color: 7237340,
                    footer: {
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    fields: [
                    {
                        name: `**Предмет на оценку:**`,
                        value: `${subject}`,
                    },
                    {
                        name: `**Оценка:**`,
                        value: `${rate}`,
                    }]
                }
            })};
            break;

        case "reverse":
            if (args.length === 0) {
                client.createMessage(message.channel.id, `***(яиначлом икувз)***`);
            }
            else {
                const text = args.join(" ");
                const reverse = text.split("").reverse().join("")
                client.createMessage(message.channel.id, {
                    embed: {
                        description: `${reverse}`,
                        author: {
                            name: `${message.author.username}#${message.author.discriminator}`,
                            icon_url: `${message.author.avatarURL}`
                        },
                        color: 7237340,
                        footer: {
                            text: "© 2020 m1t3nk0v",
                            icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                        },
                        fields: [
                            {
                                name: `**Расшифровка:**`,
                                value: `||${text}||`,
                            }]
                    }
                })
                message.delete();
                console.log(`${message.author.username}#${message.member.discriminator} сказал: ${reverse} (расшифровка: ${text})`);
            }
            break;

        case "say":
            if (args.length === 0) {
                client.createMessage(message.channel.id, `***(звуки молчания)***`);
            }
            else {
                const text = args.join(" ");
                client.createMessage(message.channel.id, {
                    embed: {
                        description: `${text}`,
                        author: {
                            name: `${message.author.username}#${message.author.discriminator}`,
                            icon_url: `${message.author.avatarURL}`
                        },
                        color: 7237340
                    }
                })
                message.delete();
                console.log(`${message.author.username}#${message.member.discriminator} сказал: ${text}`);
            }
            break;

        case "say2":
            if (message.author.id !== "274551672301158402") {
                client.createMessage(message.channel.id, `${message.author.mention} нихуя ты умный`);
            }
            else {
                const text = args.join(" ");
                client.createMessage(message.channel.id, `${text}`);
                message.delete();
                console.log(`${message.author.username}#${message.member.discriminator} сказал: ${text}`);
            }
            break;

        case "say3":
            if (message.author.id !== "274551672301158402") {
                client.createMessage(message.channel.id, `${message.author.mention} нихуя ты умный`);
            }
            else {
                message.delete();
                (async function run() {
                    const text = args.join(" ");
                    let img = await canvas.loadImage(message.attachments[0].url);
                    let c = canvas.createCanvas(img.width, img.height)
                    let ctx = c.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    client.createMessage(message.channel.id, `${text}`, { name: "unknown.png", file: c.toBuffer("image/png") });
                    console.log(`${message.author.username}#${message.member.discriminator} сказал: ${text} [${message.attachments[0].url}]`);
                })();
            }
            break;

        case "server":
            const owner = message.channel.guild.members.get(message.channel.guild.ownerID);
            client.createMessage(message.channel.id, {
                embed: {
                    author: {
                        name: message.channel.guild.name,
                        icon_url: message.channel.guild.iconURL
                    },
                    color: 7237340,
                    fields: [
                        {
                          name: `**ID:**`,
                          value: message.channel.guild.id
                        },
                        {
                          name: `**Владелец сервера:**`,
                          value: `${owner.user.username}#${owner.user.discriminator} (${owner.mention})`
                        },
                        {
                          name: `**Регион сервера:**`,
                          value: message.channel.guild.region
                        },
                        {
                          name: `**Дата создания:**`,
                          value: `${moment(message.channel.guild.createdAt).format('ll')}, ${moment(message.channel.guild.createdAt).format('LTS')}`
                        },
                        {
                          name: `**Количество участников:**`,
                          value: message.channel.guild.memberCount
                        },
                        {
                          name: `**Количество каналов:**`,
                          value: message.channel.guild.channels.size
                        }
                    ],
                    footer: {
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    thumbnail: {
                        url: message.channel.guild.iconURL
                    }
                }
            });
            break;

        case "user":
            client.createMessage(message.channel.id, {
                embed: {
                    author: {
                        name: `${member.username}#${member.discriminator}`,
                        icon_url: member.avatarURL
                    },
                    color: 7237340,
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
                          value: member.status
                        },
                        {
                          name: `**Бот?**`,
                          value: member.bot ? "Да" : "Нет"
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
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    thumbnail: {
                        url: member.avatarURL
                    }
                }
            });
            break;

        case "who":
            const subject2 = args.join(" ");
            const response2 = [
                `<@${randomMemberID}>`,
                `Я думаю, что это <@${randomMemberID}>.`,
                `Я считаю, что это <@${randomMemberID}>.`,
                `Кажется, это <@${randomMemberID}>.`,
                `Кажется, <@${randomMemberID}> ${subject2}.`,
                `Всё ясно, это <@${randomMemberID}>.`,
                `Всё ясно, <@${randomMemberID}> ${subject2}.`,
                `Мои вычисления показывают, что это <@${randomMemberID}>.`,
                `Мой IQ подсказывает мне, что это <@${randomMemberID}>.`,
                `Говорит Москва: это <@${randomMemberID}>!`,
                `Говорит Москва: <@${randomMemberID}> ${subject2}!`,
                `<@${randomMemberID}>, сука! Привет от ${message.author.mention}!`,
                `Это <@${randomMemberID}>, инфа 100%!`,
                `<@${randomMemberID}> ${subject2}, инфа 100%!`,
                `Это <@${randomMemberID}>, отвечаю!`,
                `<@${randomMemberID}> ${subject2}, отвечаю!`,
                `Это <@${randomMemberID}>, базарю!`,
                `<@${randomMemberID}> ${subject2}, базарю!`,
                `<@${randomMemberID}>, вас заметили!`,
                `<@${randomMemberID}>, приём!`,
                `<@${randomMemberID}>, ты ли это?`,
                `<@${randomMemberID}>, а мы тебя нашли)0)`
            ];
            const randomResponse = response2[Math.floor(Math.random()*response2.length)];
            if (args.length === 0) {
                client.createMessage(message.channel.id, `***(звуки молчания)***`);
            }
            else {
                client.createMessage(message.channel.id, {
                    embed: {
                        author: {
                            name: `${message.author.username}#${message.author.discriminator}`,
                            icon_url: `${message.author.avatarURL}`
                        },
                        color: 7237340,
                        footer: {
                            text: "© 2020 m1t3nk0v",
                            icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                        },
                        fields: [
                        {
                            name: `**Вопрос:**`,
                            value: `Кто ${subject2}?`,
                        },
                        {
                            name: `**Ответ:**`,
                            value: `${randomResponse}`,
                        }]
                    }
                })};
                break;

        default:
            break;
    }
})

client.connect();