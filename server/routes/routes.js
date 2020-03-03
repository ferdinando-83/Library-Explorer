//server/routes/routes.js
import express from 'express';
import bodyParser from 'body-parser';
import Destinations from '../../models/Destinations';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index')
});

router.route('/insert')
  .post((req, res) => {
    const destination = new Destinations();
    destination.address = req.body.address;
    destination.city = req.body.city;
    destination.state = req.body.state;
    destination.zipcode = req.body.zipcode;
  
    destination.save((err) => {
      if (err)
        res.send(err);
      res.send('Destination successfully added!');
    });
});

router.route('/update')
  .post((req, res) => {
    const doc = {
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    };
    
    console.log(doc);
    Destinations.update({_id: req.body._id}, doc, (err, results) => {
      if (err)
        res.send(err);
      res.send('Destination successfully updated!');
    });
});

router.get('/delete', (req, res) => {
  const id = req.query.id;
  Destinations.find({_id: id}).remove().exec((err, destination) => {
    if (err)
      res.send(err);
    res.send('Destination successfully deleted!');
  });
});

router.get('/getAll' (req, res) => {
  const cityRec = req.query.city;
  const stateRec = req.query.state;
  
  if (cityRec && cityRec != 'All') {
    Destinations.find({$and: [{city: cityRec}, {state: stateRec}]}, (err, destinations) => {
      if (err)
        res.send(err);
      res.json(destinations);
    });
  }
  else {
    Destinations.find({state: stateRec}, (err, destinations) => {
      if (err)
        res.send(err);
      res.json(destinations);
    });
  }
});

module.exports = router;
