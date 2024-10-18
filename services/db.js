const mongoose = require('mongoose');

const { User } = require('../models/User');
const { Number } = require('../models/Number');

const DB_CONN = process.env.DB_CONN;

mongoose.set('strictQuery', false);
mongoose.connect(DB_CONN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).catch(console.log);

class DBMethods {
    constructor(model) {
        this.Model = model;
    }

    async create(data) {
        return await this.Model.create(data);
    }

    async get(req, sort = null) {
        return (sort) ?
            await this.Model.findOne(req).sort(sort) :
            await this.Model.findOne(req);
    }

    async getAll(req, score = null, sort = null, limit = 0) {
        return (limit) ?
            await this.Model.find(req, score).sort(sort).limit(limit) : (sort) ?
            await this.Model.find(req).sort(sort) : await this.Model.find(req);
    }

    async update(req, update, returnDocument = 'before', upsert) {
        return await this.Model.findOneAndUpdate(req, update, {
            upsert,
            returnDocument
        });
    }

    async updateAll(req, update) {
        return await this.Model.updateMany(req, update);
    }

    async delete(req) {
        return await this.Model.findOneAndDelete(req);
    }

    async deleteAll(req) {
        return await this.Model.deleteMany(req);
    }

    async getCount(req) {
        return await this.Model.find(req).countDocuments();
    }

    async dropCollection () {
        return await this.Model.collection.drop();
    }
}

const userDBService = new DBMethods(User);
const numberDBService = new DBMethods(Number);

module.exports = {
    userDBService,
    numberDBService
}