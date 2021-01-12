const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 9800;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//start passport
app.use(passport.initialize());
app.use(passport.session())
app.set('view engine','ejs');

app.use(session({
    secret:'SUPERSECERT',
    resave:false,
    saveUninitialized:true
}))

app.get('/',(req,res) => {
    res.render('pages/login')
})

app.get('/profile',(req,res) => {
    res.send(userprofile)
})

passport.serializeUser(function(user,cb){
    cb(null,user)
})

//Error
app.get('/error',(req,res) =>  res.send("Error while login"));

passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: "http://localhost:9800/auth/google/callback"
  },
  function(token, tokenSecert, profile, done) {
        userprofile= profile
        console.log(userprofile);
        return done(null,userprofile)
  }
));

app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
    res.redirect('/profile');
    })

app.listen(port,() => {
    console.log(`App is running on port ${port}`)
})