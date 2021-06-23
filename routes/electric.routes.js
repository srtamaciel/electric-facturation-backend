const express = require('express');
const router  = express.Router();
const Electric = require('../models/Electric.model')

/* GET All electric data */
router.get('/all-data', (req, res) => {
  Electric.find()
  .then((result)=>{ 
    res.send(result.reverse())
  })
  .catch((error)=>{
    console.log(error)
  })
}); 

/* POST edit electric data */
router.post('/edit-data/:_id', (req, res) => {
  Electric.findByIdAndUpdate(req.params._id, req.body, {new:true})
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })
})


/* POST create new electric data item  */
router.post('/new-data', (req, res) => {
  Electric.create(req.body)
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })
})


/* POST delete electric item */

router.post('/delete-data/:_id', (req, res) => {
  Electric.findByIdAndDelete(req.params._id)
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })
})


module.exports = router;
