'use strict';

const express = require('express');
const morgan = require('morgan');
const ex_handlebars = require('express-handlebars'); //plantillas
const path = require('path');
const flash = require('connect-flash'); //midlewar
const express_session = require('express-session');
const mysql_store = require('express-mysql-session');
const { database } = require('./keys');

/** Inicializations **/
const app = express(); //Execute express


/** Server Settings **/
app.set('port', process.env.PORT || 1997); 
app.set('views', path.join(__dirname, 'views')); // path : url del archivo actual 

app.engine('.hbs', ex_handlebars({
     defaultLayout: 'rootPage', //vista principal, views/layouts
     layoutsDir: path.join(app.get('views'), 'layouts'),//Ruta de la carpeta views
     partialsDir: path.join(app.get("views"), 'partials'), //Para pedazos de código que podemos reutilizar
     extname: '.hbs',
     helpers: require('./lib/handlebars')
}));

app.set("view engine", ".hbs"); //Utilizar el motor    

/**  Middlewes **/
app.use(express_session({
     secret: 'appnodejswithmysqlconnection',
     resave: false,
     saveUninitialized: false,
     store: new mysql_store(database) //session en la bd
}));
app.use(flash());
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false})); //Acepta datos enviados desde formularios
app.use(express.json()); //Para que reciba jsons

/**  Global Variables (middlewares)**/
app.use((request, response, next) => { //midleware
     app.locals.msg_success =  request.flash('msg_success'); //visible en todas las vistas 
     app.locals.msg_delete = request.flash('msg_delete');
     app.locals.msg_edit = request.flash('msg_edit');
     next(); //Toma infomación del usuario y continua ejecutando el código
});

/** Routes urls **/
app.use(require('./routes'));
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));

/** Public css, js img, etc **/
app.use(express.static(path.join(__dirname, 'public'))); 

/** Stating Server **/
app.listen(app.get('port'), () => {
     console.log(`Server listenner in port ${app.get('port')}`);
});