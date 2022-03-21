const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const { resourceLimits } = require('worker_threads');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app= express();
 
var port = process.env.PORT ||8080
//database 
const dbURI = process.env.dbURI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port, ()=>{
        console.log('Server Listening on localhost:' + port)
    }) )
    .catch((err) => console.log(err));

//middleware
app.use(express.static(__dirname + '/public'));

//view engine
app.set('view engine', 'ejs')

//routes 
app.get('/', (req, res)=>{
    res.render('home');
})
app.get('/smoothies', (req, res) => {
    res.render('smoothies')
});
// app.get('/login', (req, res)=>{
//     res.sendFile('./views/login.html', { root: __dirname })
    
// })

// app.get('/register', (req, res) => {
//     //res.sendFile(path.join(__dirname, 'register.html'))
//     res.sendFile('./views/register.html', { root: __dirname })
// }) 

app.use(authRoutes);