//index. js typically handles your app startup, 
//routing and other functions of your application and does require other modules to add functionality. 
//If you're running a website or web app it would also handle become a basic HTTP web server replacing the role of
// something more traditional like Apache.
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');//Routing is one of the most important parts of any Web framework since it defines how our application should handle all the HTTP requests by the client. 
const { default: mongoose } = require('mongoose');//require for use functionalities and mongoose is usually used for connecting our Node.js to MongoDB.
const app = express();//Express ki functionalities ko use krne k liye

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Vinit12:Vinit123@cluster0.hjamr.mongodb.net/VinitPraticeProject", {
    useNewUrlParser: true
}).then(() => console.log("MongoDb is connected")).catch(err => console.log(err));


app.use('/', route);

app.listen(process.env.Port || 3000, function () {
    console.log('Express app running on port' + (process.env.Port || 3000))
});


