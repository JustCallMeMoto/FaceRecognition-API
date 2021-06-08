const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => { res.send('it is working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, () => 
  {console.log('app is running on port ${process.env.PORT}') })

/*
/ -- > res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
 */