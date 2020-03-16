'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors');
const helmet = require('helmet')
var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner.js');
require('dotenv').config()
var app = express();
const path = require("path")


app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.noCache())
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))

//Index page (static HTML)
/*
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });
*/


  app.route('/test').get((req, res) => {
      res.send('test')
  })

//For FCC testing purposes
//fccTestingRoutes(app);
runner
//Routing for API 
apiRoutes(app);  

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'PersonalLibary/client/build', 'index.html'));
});
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//serve the react build


    

//heroku stuff


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('personallibary/client/build'))
}

//Start our server and tests!

app.listen(process.env.PORT || 5000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
       // runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for unit/functional testing