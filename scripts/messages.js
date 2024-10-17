const TelegrafI18n = require('telegraf-i18n/lib/i18n');

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

const start = (lang, key = 'start_message') => {
    const message = {
        type: 'text',
        text: i18n.t(lang, key),
        extra: {}
    };

    return message;
};

const results = (lang, data) => {
    const message = {
        type: 'text',
        text: i18n.t(lang, 'results_message'),
        extra: {}
    };

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        if (element[1].length > 0) {
            console.log(element[0], i18n.t(lang, element[0]))
            message.text += '\n\n' + i18n.t(lang, element[0]) +
                element[1].reduce((acc, el) => {
                    acc += '\n' + i18n.t(lang, 'numberInfo_message', el);

                    return acc;
                }, '');
        }
    }

    return message;
};

const userInfo = (lang, user, message_id = null) => {
    const message = {
        type: (message_id) ? 'edit_text' : 'text',
        message_id,
        text: i18n.t(lang, 'userInfo_message', {
            user: i18n.t(lang, 'user_url', {
                id: user.chat_id,
                username: user.username
            }),
            isAdmin: (user.isAdmin) ? '✅' : '❌',
            isBlocked: (user.isBlocked) ? '✅' : '❌',
        }),
        extra: {}
    };
    let inline_keyboard = [];

    message.extra = {
        reply_markup: {
            inline_keyboard
        }
    };

    return message;
};

module.exports = {
    start,
    results,
    userInfo
}