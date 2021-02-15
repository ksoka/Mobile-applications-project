const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.route('/Posts')
    .get((req, res) => res.send('get Posts'))
    .post((req, res) => res.send('post Posts'))

app.route('/Posts/{postId}')
    .get((req, res) => res.send('get single Posts'))
    .patch((req, res) => res.send('patch single Posts'))
    .delete((res, req) => res.send('delete single Posts')) 


app.route('User')
    .post((req, res) => res.send('post new user'))

app.route('Users/{userId}')
    .get((req, res) => res.send('get single Users'))
    .patch((req,res) => res.send('patch sigle Users'))
    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})