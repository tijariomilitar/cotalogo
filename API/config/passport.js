const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const User = require('../app/model/user');

const db = require('./connection');

passport.serializeUser(async (user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    delete user.password;
    delete user.passwordConfirm;

    done(null, user);
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        const user = new User(req.body);

        if((await User.findByEmail(user.email)).length){ return done(null, false, req.flash('signupMessage', 'Este E-mail já está sendo utilizado.')) }
        if((await User.findByBusiness(user.business)).length){ return done(null, false, req.flash('signupMessage', 'Este nome de empresa já está sendo utilizado.')) }

        try {
            let response = await user.save();
            if(response.err){ return done(null, false, req.flash('signupMessage', response.err)); }
            user.id = response.insertId;

            return done(null, user)
        } catch (err) {
            console.log(err);
            return done(null, false, req.flash('signupMessage', 'Ocorreu um erro favor contatar o suporte!'));
        }
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        let user = await User.findByEmail(req.body.email);

        if (!user.length){
            return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'));
        };

        if(user.length){
            if (!bcrypt.compareSync(password, user[0].password)){
                return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
            };
            return done(null, user[0]);
        };
    })
);

module.exports = passport;