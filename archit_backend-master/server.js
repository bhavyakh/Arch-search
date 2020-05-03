const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const customer = require('./routes/api/customer');
const shopkeeper = require('./routes/api/shopkeeper');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log("Connected to Mongodb ") )
    .catch((err) => console.log(err));


// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);



// Use Routes
app.use('/api/customer', customer);
app.use('/api/shopkeeper', shopkeeper);











//starting here
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));;