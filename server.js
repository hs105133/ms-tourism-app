var express = require('express')
    compression = require('compression'),
    app = express();

app.use(function(req, res, next) {
    res.setHeader("Cache-Control", "public, max-age=604800"); // 7 days
    res.setHeader("Expires", new Date(Date.now() + 604800000).toUTCString());  
    next();
});

app.set('port', (process.env.PORT || 5000))

app.use(compression());
app.use(express.static('public'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});