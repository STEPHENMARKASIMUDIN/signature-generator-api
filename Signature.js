const express = require('express')
const app = express()
const compression = require('compression')
const helmet = require('helmet')
const port = 443
const { join } = require('path')
const https = require('https')
const fs = require('fs')
app.use(helmet())
app.use(compression())
app.use('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', ['http://localhost:1444'])
    res.set('Access-Control-Allow-Methods', ['GET', 'POST',])
    res.set('Access-Control-Allow-Headers', ['Content-Type', 'OPTIONS'])
    next()
});

//C:\Users\BOS CONTROL\AppData\Roaming\npm
app.use('/', express.static(join(__dirname, 'build')));


app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '/build/index.html'));
})


// app.listen(port, (err) => {
//     if (!!err) {
//         return console.log(err);

//     }
//     console.log(`Server is listening to ${port}`)
// });

var option = {
    key: fs.readFileSync('./key.pem', 'utf-8'),
    cert: fs.readFileSync('./server.crt', 'utf-8'),

}

https.createServer(option, app).listen(port, console.log(`Server Listening at port ${port}`))