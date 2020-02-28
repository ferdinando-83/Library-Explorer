//server/server.js
import express from 'express';
import router from './routes/routes.js'
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb', extended: false}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:false}));

mongosse.connect('mongodb info goes here');

app.use('/', router);

module.exports=app;
