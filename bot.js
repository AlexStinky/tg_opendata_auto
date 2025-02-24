require('dotenv').config();
//require('./scripts/logger').start();

const { Telegraf } = require('telegraf');
const {
    Extra,
    Markup,
    Stage,
    session,
} = Telegraf;
const TelegrafI18n = require('telegraf-i18n/lib/i18n');
const rateLimit = require('telegraf-ratelimit');

const middlewares = require('./scripts/middlewares');
const messages = require('./scripts/messages');

const { sender } = require('./services/sender');
const { opendataService } = require('./services/opendata');
const {userDBService} = require("./services/db");

const stage = new Stage([]);

const bot = new Telegraf(process.env.BOT_TOKEN, { handlerTimeout: 100 });

const { telegram: tg } = bot;

tg.callApi('getUpdates', { offset: -1 })
    .then(updates => updates.length && updates[0].update_id + 1)
    .then(offset => { if (offset) return tg.callApi('getUpdates', { offset }) })
    .then(() => bot.launch())
    .then(() => console.info('The bot is launched'))
    .catch(err => console.error(err))

const limitConfig = {
    window: 1000,
    limit: 1,
    onLimitExceeded: (ctx, next) => ctx.telegram.sendChatAction(ctx.from.id, 'typing')
};

const i18n = new TelegrafI18n({
    directory: './locales',
    defaultLanguage: 'ru',
    sessionName: 'session',
    useSession: true,
    templateData: {
        pluralize: TelegrafI18n.pluralize,
        uppercase: (value) => value.toUpperCase()
    }
});

bot.use(session());
bot.use(i18n.middleware());
bot.use(stage.middleware());
bot.use(rateLimit(limitConfig));

bot.use(middlewares.start);
bot.use(middlewares.commands);
bot.use(middlewares.cb);

bot.catch(err => console.error(err));

bot.telegram.getMe().then((botInfo) => {
    const botUsername = botInfo.username;

    console.log(`Username: @${botUsername}`);
});

sender.create(bot).then(() => {
    bot.telegram.sendMessage('5782842720', 'Bot started');
});


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));