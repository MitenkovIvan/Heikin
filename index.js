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
                        text: "© 2020 m1t3nk0v",
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
            
        case "eval":
            if (message.author.id !== process.env.ownerID) {
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
                    description: "`m!8ball <question>` - задать вопрос боту\n`m!hello` - передать привет боту\n`m!help` - список команд **(вы здесь)**\n`m!invite` - добавить бота на свой сервер\n`m!kotletki` - местный !ping\n`m!rate <smth>` - дать оценку какому-либо предмету\n`m!reverse <text>` - отправить текст наоборот от имени бота\n`m!say <text>` - отправить текст от имени бота\n\n**Список будет дополняться по мере появления новых команд.**",
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
                        name: `${message.author.username}`,
                        icon_url: `${message.author.avatarURL}`
                    },
                    color: 7237340,
                    footer: {
                        text: "© 2020 m1t3nk0v",
                        icon_url: "https://cdn.discordapp.com/attachments/496735656907636746/688425119797870762/m1t3nk0v_avatar.png"
                    },
                    fields: [
                    {
                        name: "Предмет на оценку:",
                        value: `${subject}`,
                    },
                    {
                        name: "Оценка:",
                        value: `${rate}`,
                    }]
                }
            })};
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
