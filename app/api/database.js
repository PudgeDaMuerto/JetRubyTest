const MongoClient = require("mongodb").MongoClient;

class Mongo {
    constructor (url, dbName, collectionName) {
        this.url = url;
        this.dbName = dbName;
        this.collectionName = collectionName;
    }
    async connect() {
        try {
            this.connection = await MongoClient.connect(this.url);
            this.db = this.connection.db(this.dbName);
            this.collection = this.db.collection(this.collectionName);
        } catch(err) {
            console.log(err);
            if (this.connection) await this.close();
        }
    }

    async close() {
        await this.connection.close();
    }

    async insertRepos(reposObjArr) {
        const options = { ordered: true };
        let counter = 0
        try {
            for (const doc of reposObjArr) {
                const res = await this.collection.updateOne({"repoId":doc.repoId}, {$set: doc}, { upsert: true });
                counter++
            }
            return counter;
        } catch(err) {
            console.log(err);
        } finally {
            await this.close();
        }
    }

    async getRepoByID(repoId) {
        try {
            const result = await this.collection.findOne({"repoId":parseInt(repoId)});
            return result;
        } catch(err) {
            console.log(err);
        } finally {
            await this.close();
        }
    }

    async getRepoByName(repoName) {
        try {
            const result = await this.collection.findOne({"name":repoName});
            return await result;
        } catch(err) {
            console.log(err);
        } finally {
            await this.close();
        }
    }

    async getAllRepos() {
        try {
            let cursor = await this.collection.find();
            let result = [];
            for await (const doc of cursor) {
                result.push(doc);
            }
            return result;
        } catch(err) {
            console.log(err);
        } finally {
            await this.close();
        }
    }
}

module.exports = { Mongo }