const authorModel = require("../models/authorModel");
const jwt = require('jsonwebtoken');

const createauthor = async function (req, res) {

    try {
        let data = req.body;
        let author = await authorModel.create(data);
        return res.status(201).send({ msg: author });

    } catch (error) {
        return res.status(500).send({ status: false, msg: err.message })

    }

};




const authorlogin = async function (req, res) {
    try {
        let data = req.body;
        const { email, password } = data;

        let author = await authorModel.findOne({ email: email, password: password })
        if (!author) {
            return res.status(400).send("Invalid eamil or password");

        }
        // taking id from db
        let aid = author._id.toString();

        // After validation of user creating a token

        let token = jwt.sign({
            authorid: aid
        },

            "BloggingSiteProject"

        );
        res.setHeader("x-api-key", token);
        res.send({ status: true, data: "login Successful", token });


    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }

};

module.exports.createauthor = createauthor
module.exports.authorlogin = authorlogin











