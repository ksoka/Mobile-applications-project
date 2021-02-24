const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.set('port', (process.env.PORT || 80));

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let Post = [
    {
      postId: uuidv4(),
      title: 'Mountain Bike',
      description: 'This is a high quality mountain bike for extreme condition biking',
      category: 'Outdoor Sports',
      location: 'Oulu FI',
      images1: '../assets/Bike.jpg',
      images2: '../assets/Bike2.jpg',
      images3: '',
      images4: '',
      askingPrice: 300,
      deliveryType: 'Shipping',
      dateOfPosting: '15-2-2021',
      sellerName: 'Kalle Soukka',
      sellerInfo: 'Schoolstreet 2'
    },
    {
      postId: uuidv4(),
      title: 'Second bike',
      description: 'This is a high quality mountain bike for normal condition biking',
      category: 'Biking',
      location: 'Oulu FI',
      images1: 'Bike.jpg',
      images2: 'Bike2.jpg',
      images3: '',
      images4: '',
      askingPrice: 300,
      deliveryType: 'Shipping',
      dateOfPosting: '15-2-2021',
      sellerName: 'Kalle Soukka',
      sellerInfo: 'Schoolstreet 2'
    }
  ]
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
    .get((req, res) => { res.json(Post)})
    .post((req, res) => {
      const newPost = {
        postId: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        images1: req.body.images1,
        images2: req.body.images2,
        images3: req.body.images3,
        images4: req.body.images4,
        askingPrice: req.body.askingPrice,
        deliveryType: req.body.deliveryType,
        dateOfPosting: req.body.dateOfPosting,
        sellerName: req.body.sellerName,
        sellerInfo: req.body.sellerInfo
      };
      Post.push(newPost);

      res.status(201);
      res.json(newPost);
    })

app.route('/Posts/:postsId')
    .get((req, res) => {
      const resultPost = Post.find(p => {
        if (p.postId == req.params.postsId) {
          return true;
        }
        else {
          return false;
        }
      })
      if(resultPost === undefined)
        {
          res.sendStatus(404)
        } 
        else
        {
          res.json(resultPost);
        }
    })
    .put((req, res) => {
      var reArray = [];
        for (element of Post) {
          if(element.postId == req.params.postsId) {
              element.title == req.body.title;
              element.description == req.body.description;
              element.category == req.body.category;
              element.location == req.body.location;
              element.images1 == req.body.images1;
              element.images2 == req.body.images2;
              element.images3 == req.body.images3;
              element.images4 == req.body.images4;
              element.askingPrice == req.body.askingPrice;
              element.deliveryType == req.body.deliveryType;
              element.dateOfPosting == req.body.dateOfPosting;
              element.sellerName == req.body.sellerName;
              element.sellerInfo == req.body.sellerInfo;
              reArray.push(element);
              res.json(reArray)
            }
        }
    })
    .delete((req, res) => {
      Post = Post.filter(po => po.postId != req.params.postId);
      res.sendStatus(200);
    }) 

    
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
    

app.listen(app.get('port'), () => {
  console.log(`Example app listening at {port}`)
})