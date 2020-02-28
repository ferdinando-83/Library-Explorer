//server/server.js
import express from 'express';
import router from './routes/routes.js'
import path from 'path';

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', router);

module.exports=app;
