const blogModel = require('../models/blogModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { update, findOneAndUpdate } = require('../models/blogModel');


const createblog = async function (req, res) {
    try {
        let Blogs = req.body;
        let createblogs = await blogModel.create(Blogs);
        return res.status(201).send({ status: true, msg: createblogs });
    }

    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}
module.exports.createblog = createblog;


const getBlogs = async function (req, res) {

    try {
        let data = req.query;
        let blogs = await blogModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, data] })//AND
        //let blogs = await blogModel.find({$or:[{ isDeleted: false, isPublished: true}] })//.select({title:1,tags:1,authorId:1,_id:0})//OR

        // check data exits or not
        if (blogs.length <= 0) {
            return res.status(400).send({ status: false, msg: "Data not found" })

        }
        return res.status(200).send({ status: true, msg: blogs })


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }

}
module.exports.getBlogs = getBlogs;


const updateblogs = async function (req, res) {
    try {
        let Id = req.params.blogId;
        let userData = req.body;

        let { body, title, isPublished, tags, subcategory, isDeleted } = userData

        if (Id.length < 24) {
            return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        }

        let user = await blogModel.findById(Id)
        if (!user) {
            return res.status(404).send({ status: false, msg: "no such blog exist" });

        }

        let updateblog1 = await blogModel.findByIdAndUpdate({ _id: Id }, {
            $set: { body: body, title: title, isPublished: isPublished, isDeleted: isDeleted },
            $push: { tags: tags, subcategory: subcategory }
        }, { new: true })

        if (updateblog1.isPublished == true) {
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { PublishedAt: new Date() });

        }
        if (updateblog1.isPublished == false) {
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { PublishedAt: null });

        }

        if (updateblog1.isDeleted == true) {
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { deletedAt: new Date() });

        }
        if (updateblog1.isDeleted == false) {
            let update = await blogModel.findOneAndUpdate({ _id: Id }, { isDeleted: null })

        }
        return res.status(201).send({ status: true, data: updateblog1 });

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });

    }

};
module.exports.updateblogs = updateblogs;


const deleteBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (blogId.length < 24) {
            return res.status(400).send("invalid Blog-Id")

        }
        if (!blogId) {
            return res.status(400).send({ msg: "Enter blog-id in your params" });


        }
        let validID = await blogModel.findById(blogId);
        if (!validID) {
            return res.status(400).send({ msg: "Enter valid blogId" })

        }
        let checkid = validID.isDeleted;
        if (validID) {
            if (checkid == false) {
                let blogDelete = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });
                if (blogDelete.isDeleted == true) {
                    let update = await blogModel.findOneAndUpdate({ _id: blogId }, { deletedAt: new String(Date()) });

                }
                if (blogDelete.isDeleted == true) {
                    let update = await blogModel.findOneAndUpdate({ _id: blogId }, { deletedAt: null });

                }
                return res.status(201).send({ status: true, data: blogDelete });

            }
            else {
                return res.status(400).send({ status: false, msg: "Blog is deleted" });
            }

        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }

}

module.exports.deleteBlogs = deleteBlogs;




const queryDeleted = async function (req, res) {
    try {
        let data = req.query;
        let blog = req.query.authorId;
        if (!blog) {
            return res.status(400).send({ status: false, msg: "Enter authorId in Query" })

        }
        let valid = await blogModel.findOne(data);
        if (!valid) {
            return res.status(400).send({ status: false, msg: "Data doesn't exist" })

        }
        let deleted = await findOneAndUpdate(data, { isDeleted: true }, { new: true });
        if (deleted.isDeleted == true) {
            let update = await blogModel.findOneAndUpdate(data, { deletedAt: new String(Date()) });

        }
        if (deleted.isDeleted == false) {
            let update = await blogModel.findOneAndUpdate(data, { deletedAt: null })

        }
        return res.status(200).send({ status: true, data: deleted });

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}

module.exports.queryDeleted = queryDeleted;