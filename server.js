const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// port is set by Heroku, if Heroku not available use 3000
const port = process.env.PORT || 3000;

var app = express();

// allow partials
hbs.registerPartials(__dirname + '/views/partials');
// app.set key value pair
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  // return 'test';
  return new Date().getFullYear();
});

// enable if we want to go into maintenance mode
/*
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});
*/

// express middleware lets you configure how your express application works
// express.static takes the absolute path to the folder you want to serve up
// __dirname stores path to the projects directory
app.use(express.static(__dirname + '/public'));

// take some text and return it in uppercase
// a helper that takes an input
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.use is how you register middleware, and you register it by passing in a function
// next exists so you can tell express when your middleware function is done
// because you can have as much middleware as you like registered to a single express app
app.use((req, res, next) => {

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  // fs.append('server.log', log + '\n');
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append the server.log.');
    }
  });

  console.log(log);
  // only when we call next() will the application continue to run
  // may want to not call next to prevent moving on to the next piece of middleware
  next();
})

/*
// set up a handler for a http get request
// first argument is the url (/ for the root of the app)
// second argument is the function to run
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Oliver',
    like: [
      'cars',
      'bikes'
    ]
  });
});
*/

// render some json
/*
// set up a handler for a http get request
// first argument is the url (/ for the root of the app)
// second argument is the function to run
app.get('/', (req, res) => {
  // render is going to let you render any pages you have set up with your current view engine
  // render the static about.hbs page
  res.send({
    name: 'Oliver',
    like: [
      'cars',
      'bikes'
    ]
  });
});
*/

// set up a handler for a http get request
// first argument is the url (/ for the root of the app)
// second argument is the function to run
app.get('/', (req, res) => {
  // render is going to let you render any pages you have set up with your current view engine
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my page'
    // currentYear: new Date().getFullYear()
  });
});

// about route
/*
app.get('/about', (req, res) => {
  res.send('About Page');
});
*/

// about route
// render the static about.hbs page
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
    // currentYear: new Date().getFullYear()
  });
});

// about route
// render the static about.hbs page
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
    // currentYear: new Date().getFullYear()
  });
});

// bad route
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// bind the application to a port on our machine
// first option is the port
// second option is an optional function, lets us do something when the server is up (can take some time to get started)
// app.listen(3000);
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
