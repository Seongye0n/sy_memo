const express = require('express'); //express 불러옴.
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; //서버 port 5000으로 열어줌.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exrended: true}));

app.get('/api/hello', (req, res) => { //api/hello로 접속
    res.send({Message: 'Hello Express!'}); 
});

app.listen(port, () => console.log(`Listening on port ${port}`));
