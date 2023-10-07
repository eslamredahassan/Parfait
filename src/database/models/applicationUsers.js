const { MongoClient } = require("mongodb");

const userSchame = new MongoClient.Schame({
    ap_usre_id: {
        type: string,
        required: true,
        },
     username: {
        type: string,
        required: true,
        }
});

const applicationUsers = module.exports = MongoClient.model('User', userSchame);