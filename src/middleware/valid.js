const authorModel = require('../models/authorModel');
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



const validateAuthor = async function (req, res, next) {

    try {
        let data = req.body
        const { firstname, lastname, title, email, password } = data

        if (Object.keys(data).length != 0) {
            if (data.firstname === undefined) {
                return res.status(400).send({ status: false, msg: "fname is required" });

            }
            if (data.lastname === undefined) {
                return res.status(400).send({ status: false, msg: "lname is required" });

            }
            if (data.title === undefined) {
                return res.status(400).send({ status: false, msg: "title is required" });

            }
            if (data.email === undefined) {
                return res.status(400).send({ status: false, msg: "email is required" });

            }
            if (data.password === undefined) {
                return res.status(400).send({ status: false, msg: "password is required" });

            }
        }
        else {
            return res.status(400).send({ status: false, msg: "mandatory field is missing" })

        }
        if (!re.test(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })
        }
        let rareemail = await authorModel.findOne({ email: data.email })
        if (rareemail) {
            return res.status(400).send({ status: false, msg: "email is already exist" });

        }
        if (Object.values(firstname).length <= 0) {
            return res.status(400).send({ status: false, msg: "firstname is required" });

        }
        if (Object.values(lastname).length <= 0) {
            return res.status(400).send({ status: false, msg: "lastname is required" });

        }
        if (Object.values(password).length <= 0) {
            return res.status(400).send({ status: false, msg: "password os required" });

        }
        if (Object(email).length <= 0) {
            return res.status(400).send({ status: false, msg: "email is required" });

        }
        if (Object(title).length <= 0) {
            return res.status(400).send({ status: false, msg: "title is required" });

        } else {
            next()
        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });

    }

}
module.exports.validateAuthor = validateAuthor;



const validateblog = async function (req, res, next) {
    try {
        let data = req.body;
        const { title, body, category, authorId } = data

        if (Object.keys(data).length != 0) {
            if (data.title === undefined) {
                return res.status(400).send({ status: false, msg: "title is required !!!" });


            }
            if (data.body === undefined) {
                return res.status(400).send({ status: false, msg: "body is required !!!" });


            }
            if (data.category === undefined) {
                return res.status(400).send({ status: false, msg: "category is required !!!" });


            }
            if (data.authorId === undefined) {
                return res.status(400).send({ status: false, msg: "authorId is required !!!" });


            }
        } else {
            return res.status(400).send({ msg: "Mandatory field is missing !!!" });

        }
        if (Object.values(title).length <= 0) {
            return res.status(400).send({ status: false, msg: "Title is missing" })

        }
        if (Object.values(category).length <= 0) {
            return res.status(400).send({ status: false, msg: "Category is missing" })

        }
        if (Object.values(body).length <= 0) {
            return res.status(400).send({ status: false, msg: "Body is missing" })

        }

        const authorid = await authorModel.findById(authorId)
        if (!authorid) {
            return res.status(400).send({ msg: "Invalid authorId" })

        }
        else {
            next()
        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }

}
module.exports.validateblog = validateblog;



