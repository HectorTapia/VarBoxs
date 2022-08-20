const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session');
const passport = require('passport');

const {database} = require('./keys');

//inicializaciones
const app = express();
require('./lib/passport');

//configuraciones
app.set('port', process.env.PORT || 4003);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(session({
    secret: 'varboxssqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



//Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});


//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use(require('./routes/productos'));
app.use(require('./routes/details'));


//Public
app.use(express.static(path.join(__dirname, 'public')));

//inicializar servidor
app.listen(app.get('port'), () => {
    console.log('Server en puerto', app.get('port'));
});