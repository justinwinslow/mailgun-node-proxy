var express = require('express'),
    mailgun = require('mailgun-js'),
    app = express();

app.configure(function(){
  // Set port
  app.set('port', process.env.PORT || 3333);

  app.use(express.bodyParser());
});

app.post('/mail', function(req, res){
  var data = req.body;

  mailgun('key-27u8fvlqultyil204j3aesrl1rkeoc10', data.domain)
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
