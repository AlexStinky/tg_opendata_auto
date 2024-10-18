const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NumberSchema = new Schema({
    number: {
        type: String
    },
    price: {
        type: String
    },
    tsc: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const Number = mongoose.model('Number', NumberSchema);

module.exports = {
    Number
}