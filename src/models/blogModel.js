const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        body: {
            type: String,
            require: true
        },
        authorId: {
            type: ObjectId,
            require: true,
            ref: "author"
        },
        tags: [String],

        category: {
            type: String,
            require: true
        },

        subcategory: [String],

        deletedAt: {
            type: String,
            default: "Date"
        },

        isDeleted: {
            type: Boolean,
            default: false

        },

        isPublished: {
            type: Boolean,
            default: false
        },

        PublishedAt: {
            type: String,
            default: "Date"
        }


    }, { timestamps: true }
)
module.exports = mongoose.model('Blog', blogSchema);