const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 9800;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


app.listen(port,() => {
    console.log(`App is running on port ${port}`)
})