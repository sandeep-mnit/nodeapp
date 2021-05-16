const express = require("express");
const path = require("path");
const app = express();
const bodyparser  = require("body-parser")
var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://sandeep:sandeep1234@cluster0.rytxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true})
const port = 8001;

// DEFINE MONGOOSE SCHEMA
var contactSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
    desc : String,
})

var contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // set the templete engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory


// ENDPOINTS

app.get('/', (req,res)=>{
    const params = {}
    // res.send('Hello World!')
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        // res.send("This item has been saved");
        res.send("This item has been saved" + myData);
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})

// START THE SERVER

app.listen(port, ()=>{
    console.log(`The application started successfully on port no ${port}`);
})
