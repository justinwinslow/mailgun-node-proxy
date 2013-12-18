var express = require('express'),
    mailgun = require('mailgun-js'),
    config = require('./config.json'),
    app = express();

    console.log(config.key);

app.configure(function(){
  // Set port
  app.set('port', process.env.PORT || 3333);

  app.use(express.bodyParser());
});

app.post('/mail', function(req, res){
  var data = req.body;

  mailgun(config.key, data.domain)
    .messages.send(data, function (error, response, body) {
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
