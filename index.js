const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//--------- Adding dishRouter -------
const dishRouter = require('./routes/dishRouter');
//--------- Adding leaderRouter -------
const leaderRouter = require('./routes/leaderRouter');
//--------- Adding promoRouter -------
const promoRouter = require('./routes/promoRouter');


const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// // ------ Old code: See routes folder for updates ---------------------------------

// app.all('/dishes', (req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// });

// // ------ '/dishes' ---------------------------------

// app.get('/dishes', (req, res, next) => {
//     res.end('Will send all the dishes to you!');
// });

// app.post('/dishes', (req,res, next) => {
//     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
// });

// app.put('/dishes', (req,res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// });

// app.delete('/dishes', (req, res, next) => {
//     res.end('Deleting all the dishes!');
// });

// ----------------- '/dishes/:dishId' ------------------------------------

// app.get('/dishes/:dishId', (req, res, next) => {
//     res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
// });

// app.post('/dishes/:dishId', (req,res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /dishes/' + req.params.dishId);
// });

// app.put('/dishes/:dishId', (req,res, next) => {
//     res.write('Updating the dish: ' + req.params.dishId + '\n')
//     res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
// });

// app.delete('/dishes/:dishId', (req, res, next) => {
//     res.end('Deleting dish: ' + req.params.dishId);
// });



// Any request coming to the /dishes 'endpoint' will be handled by the dishRouter code.
app.use('/dishes', dishRouter);

// Adding '/leaders' as a endpoint router.
app.use('/leaders', leaderRouter);

// Adding '/promotions' as a endpoint router.
app.use('/promotions', promoRouter);


app.use(express.static(__dirname+ '/public'));

app.use((req, res, next) => {
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
})

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log('----------------------------------------')
    console.log(`Server running at http://${hostname}:${port}`)
    console.log('----------------------------------------')

});