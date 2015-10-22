var express = require('express'),
    mailgun = require('mailgun-js'),
    config = require('./config.json'),
    bodyParser = require('body-parser'),
    app = express();

// Set port
app.set('port', process.env.PORT || 3333);
// Use express bodyParser middleware to populate req.body
app.use(bodyParser.raw());

// Listen for post
app.post('/mail', function(req, res){
  var data = req.body;

  // Instantiate mailgun module with unique api key and domain
  mailgun(config.key, data.domain)
    // Send message
    .messages().send(data, function (error, response, body) {
      // Handle errors
      if (error) {
        res.send(500, error);
      } else {
        res.send(200);
      }
    });
});

app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'));
});
