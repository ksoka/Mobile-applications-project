const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let postData = {
  Post: [
    {
      postId: uuidv4(),
      title: 'Mountain Bike',
      description: 'This is a high quality mountain bike for extreme condition biking',
      category: 'Outdoor Sports',
      location: 'Oulu FI',
      images1: 'Bike.png',
      images2: 'Bike2.png',
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
      images1: 'Bike.png',
      images2: 'Bike2.png',
      images3: '',
      images4: '',
      askingPrice: 300,
      deliveryType: 'Shipping',
      dateOfPosting: '15-2-2021',
      sellerName: 'Kalle Soukka',
      sellerInfo: 'Schoolstreet 2'
    }
  ]
}
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

function checkThePost(postId) {;
  const itemInfo = postData.Post.find(pos => pos.postId == postId);
  return itemInfo ;
}

app.route('/Posts')
    .get((req, res) => { res.json(postData)})
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
      postData.Post.push(newPost);

      res.status(201);
      res.json(newPost);
    })

app.route('/Posts/:postsId')
    .get((req, res) => {
      const resultPost = postData.Post.find(p => {
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
      itemInfo = checkThePost(req.params.postsId);
      if (itemInfo != null)
      {
        for (var i = 0; i < postData.Post.length; i++) {
          if (postData.Post[i].postId == req.params.postsId) {
            postData.Post[i].title == req.body.title ;
            postData.Post[i].description == req.body.description;
            postData.Post[i].category == req.body.category;
            postData.Post[i].location == req.body.location;
            postData.Post[i].images1 == req.body.images1;
            postData.Post[i].images2 == req.body.images2;
            postData.Post[i].images3 == req.body.images3;
            postData.Post[i].images4 == req.body.images4;
            postData.Post[i].askingPrice == req.body.askingPrice;
            postData.Post[i].deliveryType == req.body.deliveryType;
            postData.Post[i].dateOfPosting == req.body.dateOfPosting;
            postData.Post[i].sellerName == req.body.sellerName;
            postData.Post[i].sellerInfo == req.body.sellerInfo;
          };
      }
      res.sendStatus(200);
      res.json({postId:itemInfo.postId}) ;
      }
      else 
      {
        res.sendStatus(404);
      }
    })
    .delete((req, res) => {
      postData.Post = postData.Post.filter(po => po.postId != req.params.postId);
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
    .put((req,res) => {
      const updateUser = userdata.Users.find(us => {
        if (us.id == req.params.userId) {
          userData.Users.push({
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth
          })
        }
        else {
          return false;
        }
      });
      if(updateUser == undefined)
      {
        res.sendStatus(404)
      }
      else
      {
        res.json(updateUser)
      }
    })
    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})