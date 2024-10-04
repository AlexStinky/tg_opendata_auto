const fs = require('fs');

const messages = require('./messages');

const { sender } = require('../services/sender');
const { userDBService } = require('../services/db');

const LANGUAGES = /ru/;

const start = async (ctx, next) => {
    const { message } = ctx.update.callback_query || ctx.update;

    if (message) {
        try {
            const username = ctx.chat.username || ctx.from.username || ctx.from.first_name;
            const from = (message.text && message.text.includes('/start ')) ?
                message.text.replace('/start ', '') : 'organic';

            ctx.state.user = await userDBService.get({ chat_id: ctx.from.id });

            if (!ctx.state.user) {
                const lang = (LANGUAGES.test(ctx.from.language_code)) ?
                    ctx.from.language_code : 'uk';

                ctx.state.user = await userDBService.create({
                    chat_id: ctx.from.id,
                    username,
                    lang,
                    from
                });
            }

            await ctx.i18n.locale(lang);

            if (ctx.state.user.username !== username) {
                ctx.state.user = await userDBService.update({ chat_id: ctx.from.id }, {
                    isActive: true,
                    username,
                    lang
                }, 'after');
            }
        } catch (error) {
            //...
        }

        if (ctx.state.user.isBlocked) {
            return await ctx.replyWithHTML(ctx.i18n.t('youAreBlocked_message'));
        }
    }

    return next();
};

const commands = async (ctx, next) => {
    const {
        message
    } = ctx.update;

    const { user } = ctx.state;

    if (message && message.text) {
        const { text } = message;

        const match = text.split(' ');

        let response_message = null;

        if (message.chat.type === 'private') {
            if (text.includes('/start') || text === ctx.i18n.t('cancel_button')) {
                await ctx.scene.leave();

                response_message = messages.start(user.lang);
            }
        }

        if (response_message) {
            sender.enqueue({
                chat_id: ctx.from.id,
                message: response_message
            });
        }
    }

    return next();
};

const cb = async (ctx, next) => {
    const { callback_query } = ctx.update;

    const { user } = ctx.state;

    if (callback_query) {
        const { message_id } = callback_query.message;

        const match = callback_query.data.split('-');

        let deleteMessage = true,
            response_message = null;

        if (callback_query.message.chat.type === 'private') {
            if (match[0] === 'cancel') {
                await ctx.scene.leave();

                deleteMessage = false;
                response_message = messages.start(user.lang);
            }
        }

        if (response_message) {
            if (deleteMessage) {
                await sender.deleteMessage(ctx.from.id, message_id);
            }

            sender.enqueue({
                chat_id: ctx.from.id,
                message: response_message
            });
        }
    }

    return next();
};

module.exports = {
    start,
    commands,
    cb
}