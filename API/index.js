const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); 
const has = require('has-value');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


let userData = {
  Users: [
  {
    id: uuidv4(),
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@gmail.com',
    dateOfBirth: '1997-10-31',
  },
  {
    id: uuidv4(),
    firstName: 'Kalle',
    lastName: 'Soukka',
    email: 't9soka00@students.oamk.fi',
    dateOfBirth: '1998-2-14',
  },
  {
    id: uuidv4(),
    firstName: 'Felix',
    lastName: 'Pape',
    email: 'pape.felix@oamk.fi',
    dateOfBirth: '1996-15-2'
  }
  ]
}

app.route('/Posts')
    .get((req, res) => res.send('get Posts'))
    .post((req, res) => res.send('post Posts'))

app.route('/Posts/{postId}')
    .get((req, res) => res.send('get single Posts'))
    .patch((req, res) => res.send('patch single Posts'))
    .delete((res, req) => res.send('delete single Posts')) 

    
app.route('/User')
    .get((req, res) => { res.json(userData)})
    .post((req, res) => {

      const newUser = {
        id: uuidv4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth
      };

      userData.Users.push(newUser);

      res.status(201);
      res.json(newUser);
    });

app.route('User/:userId')
    .get((req, res) => {
      const resultUser = userData.Users.find(u => {
        if (u.id == req.params.userId) {
          return true;
        }
        else {
          return false;
        }
      });
      if(resultUser === undefined)
      {
        res.sendStatus(404)
      }
      else
      {
        res.json(resultUser);
      }
    })
    .patch((req,res) => res.send('patch sigle Users'))
    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})