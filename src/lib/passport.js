const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../databese');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email_us',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email_us, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE email_us = ?', [email_us]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.mathPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success','Welcome' + user.nombre));
        }else done(null, false, req.flash('message','La contraseña no es correcta'));
    }else{
        return done(null, false, req.flash('message','Correo electronico no registrado'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email_us',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email_us, password, done) => {
    const { nombre_us, app_us, apm_us } = req.body;
    const newUser = {
        email_us,
        password,
        nombre_us,
        app_us,
        apm_us
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id_us = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id_us);
    
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users Where id_us = ?', [id]);
    done(null, rows[0]);
});