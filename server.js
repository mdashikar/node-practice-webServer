const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();



hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('steamIt', (text) => {
    return text.toUpperCase();
});


app.set('view engine', 'hbs');

app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next)=>{
//     //res.send('Hello Express!!!!');
//     res.render('maintainence.hbs', {
//         pageHeader:'Under Maintainence ',
//         contentText: 'Be Paitence Will be back shortly!! ',
//         pharaText:''
        
//     })
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    //res.send('Hello Express!!!!');
    res.render('home', {
        pageTitle:'Synergy',
        pharaText: 'This is port 3000 !!!'
        
    })
});



app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        pharaText: 'This is port 3000 !!!'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs',{
        pageTitle: 'Project',
        pharaText: 'Portfolio will be showcased shortlyy'
    });
})


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'The data you requested not fetch right now'
    });

});

app.listen(port, () => {
    console.log(`Server is set up to ${port} port!! Go check you fool.`)
});