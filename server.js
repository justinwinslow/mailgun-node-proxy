var express = require('express'),
    mailgun = require('mailgun-js'),
    config = require('./config.json'),
    bodyParser = require('body-parser'),
    app = express();

// Set port
app.set('port', process.env.PORT || 3333);

// Listen for post
app.post('/mail', bodyParser.urlencoded({extended: true}), function(req, res){
  var data = req.body;

  // Instantiate mailgun module with unique api key and domain
  mailgun({apiKey: config.key, domain: data.domain})
    // Send message
    .messages().send(data, function (error, response, body) {
      // Handle errors
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send();
      }
    });
});

app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'));
});
