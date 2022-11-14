const mongoose = require('mongoose');

let authorSchema = new mongoose.Schema(

    {
        firstname: {
            type: String,
            require: true
        },

        lastname: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true,
            enum: ["Mr", "Mrs", "Miss"]
        },

        email: {

            type: String,
            require: true,
            unique: true

        },

        password: {
            type: String,
            require: true
        }

    },
    { timestamps: true });
module.exports = mongoose.model('author', authorSchema);













