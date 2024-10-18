const { Queue } = require('../modules/queue');

const { userDBService } = require('./db');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class Sender extends Queue {
    constructor() {
        super();

        this.bot = {};
        this.delay = 100;
        this.counter = 0;

        this.TEXT_MAX_LENGTH = 4000;
        this.CAPTION_MAX_LENGTH = 1000;

        this.FORBIDDEN_ERRORS = [
            'bot was blocked',
            "bot can't initiate conversation with a user",
            'user is deactivated',
            'chat not found'
        ];
    }

    checkForbidden(text) {
        return this.FORBIDDEN_ERRORS.some(el => text.includes(el));
    }

    async create(bot) {
        this.bot = bot;

        return this.bot;
    }

    async start() {
        if (this.storage[this.count - 1]) {
            const {
                chat_id,
                from_chat_id,
                message_id,
                message,
            } = this.storage[this.count - 1];

            this.dequeue();

            if (from_chat_id) {
                await this.forwardMessage(chat_id, from_chat_id, message_id, message);
            } else {
                await this.sendMessage(chat_id, message);
            }

            if (this.counter % 29 === 0) {
                await sleep(1000);
            }

            this.counter++;
        }

        setTimeout(() => this.start(), 100);
    }

    async unbanUser(chat_id, user) {
        try {
            return await this.bot.telegram.unbanChatMember(chat_id, user.chat_id, {
                only_if_banned: true
            });
        } catch (error) {
            console.log('[unbanUser]', error.response);

            return null;
        }
    }

    async banUser(chat_id, user) {
        try {
            return await this.bot.telegram.banChatMember(chat_id, user.chat_id);
        } catch (error) {
            console.log('[banUser]', error.response);

            return null;
        }
    }

    async deleteMessage(chat_id, message_id) {
        try {
            return await this.bot.telegram.deleteMessage(chat_id, message_id);
        } catch (error) {
            console.log('[deleteMessage]', error.response);

            return null;
        }
    }

    async deleteMessages(chat_id, message_ids) {
        try {
            return await this.bot.telegram.callApi('deleteMessages', {
                chat_id,
                message_ids
            });
        } catch (error) {
            console.log('[deleteMessages]', error.response);

            return null;
        }
    }

    async getChat(chat_id) {
        try {
            return await this.bot.telegram.callApi('getChat', {
                chat_id,
            });
        } catch (error) {
            console.log('[getChat]', error.response);

            return null;
        }
    }

    async getChatMember(chat_id, user_id) {
        try {
            return await this.bot.telegram.callApi('getChatMember', {
                chat_id,
                user_id
            });
        } catch (error) {
            console.log('[getChatMember]', error.response);

            return null;
        }
    }

    async forwardMessage(chat_id, from_chat_id, message_id, message = null) {
        try {
            const res = await this.bot.telegram.callApi('forwardMessage', {
                chat_id,
                from_chat_id,
                message_id
            });

            if (message) {
                return await this.sendMessage(chat_id, message);
            }

            return res;
        } catch (error) {
            console.log('[forwardMessage]', error.response);

            return null;
        }
    }

    async forwardMessages(chat_id, from_chat_id, message_ids) {
        try {
            const res = await this.bot.telegram.callApi('forwardMessages', {
                chat_id,
                from_chat_id,
                message_ids
            });

            return res;
        } catch (error) {
            console.log('[forwardMessages]', error.response);

            return null;
        }
    }

    async copyMessages(chat_id, from_chat_id, message_ids) {
        try {
            const res = await this.bot.telegram.callApi('copyMessages', {
                chat_id,
                from_chat_id,
                message_ids
            });

            return res;
        } catch (error) {
            console.log('[copyMessages]', error.response);

            return null;
        }
    }

    async sendMessage(chat_id, message) {
        const MAX_LENGTH = (message.type === 'text') ?
            this.TEXT_MAX_LENGTH : this.CAPTION_MAX_LENGTH;

        let next = null,
            text = message.text,
            extra = {};

        if (text && text.length > MAX_LENGTH) {
            const temp = (message.text.split('\n'))
                .reduce((acc, el) => {
                    if ((acc['current'].length + el.length) < MAX_LENGTH) {
                        acc['current'] += el + '\n';
                    } else {
                        acc['next'] += el + '\n';
                    }

                    return acc;
                }, {
                    current: '',
                    next: ''
                });
            next = temp.next;
            text = temp.current;
            extra = {
                caption: text,
                parse_mode: 'HTML'
            };
        } else {
            extra = {
                caption: text,
                parse_mode: 'HTML',
                ...message.extra
            };
        }

        await sleep(this.delay);

        try {
            let res = null;

            switch (message.type) {
                case 'action':
                    res = await this.bot.telegram.sendChatAction(chat_id, message.text);
                    break;
                case 'cb':
                    res = await this.bot.telegram.answerCbQuery(message.id, message.text, message.alert, extra);
                    break;
                case 'edit_keyboard':
                    res = await this.bot.telegram.editMessageReplyMarkup(chat_id, message.message_id, null, extra.reply_markup);
                    break;
                case 'edit_text':
                    res = await this.bot.telegram.editMessageText(chat_id, message.message_id, null, message.text, extra);
                    break;
                case 'edit_media':
                    res = await this.bot.telegram.editMessageMedia(chat_id, message.message_id, null, message.file, extra);
                    break;
                case 'photo':
                    res = await this.bot.telegram.sendPhoto(chat_id, message.file, extra);
                    break;
                case 'document':
                    res = await this.bot.telegram.sendDocument(chat_id, message.file, extra);
                    break;
                case 'video':
                    res = await this.bot.telegram.sendVideo(chat_id, message.file, extra);
                    break;
                case 'media_group':
                    await this.bot.telegram.sendMediaGroup(chat_id, message.file, extra);
                    res = await this.bot.telegram.sendMessage(chat_id, text, extra);
                    break;
                case 'invoice':
                    res = await this.bot.telegram.sendInvoice(chat_id, message, extra);
                    //await this.bot.telegram.sendMessage(chat_id, text, extra);
                    break;
                case 'location':
                    await this.bot.telegram.callApi('sendLocation', {
                        chat_id: chat_id,
                        latitude: message.location.latitude,
                        longitude: message.location.longitude
                    });
                    res = await this.bot.telegram.sendMessage(chat_id, text, extra);
                    break;
                default:
                    res = (message.text.length > MAX_LENGTH) ?
                        await this.bot.telegram.sendMessage(chat_id, text, extra) :
                        await this.bot.telegram.sendMessage(chat_id, text, extra);
                    break;
            }

            /*if (this.delay >= 1000) {
                this.delay = 100;
            } else {
                this.delay += 100;
            }*/

            if (message.text && message.text.length > MAX_LENGTH) {
                const temp = {
                    type: 'text',
                    text: next,
                    extra: {
                        caption: next,
                        parse_mode: 'HTML',
                        ...message.extra
                    }
                };

                return this.sendMessage(chat_id, temp);
            } else {
                return res;
            }
        } catch (error) {
            const response = (error.response) ? error.response : error;

            console.log('[sendMessage]', response);

            if (response.description) {
                if (this.checkForbidden(response.description)) {
                    await userDBService.update({ chat_id }, {
                        isActive: false
                    });
                } else if (response.description.includes("Bad Request: can't parse entities:")) {
                    const temp = {
                        type: message.type,
                        text: message.text.replace(/([<>\/])/g, ''),
                        extra: {}
                    };

                    return this.sendMessage(chat_id, temp);
                }
            }

            return null;
        }
    }
}

const sender = new Sender();
sender.start();

module.exports = {
    sender
}