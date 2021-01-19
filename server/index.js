require('dotenv').config();
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts'),
      massive = require('massive'),
      session = require('express-session'),

const PORT = 8097;

const {CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      cookie: {maxAge: 60000},
    })
);

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));