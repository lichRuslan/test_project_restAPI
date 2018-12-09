const express = require('express');
const router = express.Router(); 
const Iir = require('../models/iir');
//get the list of IIR from the db
router.get('/iirs', function(req,res, next){
    // Iir.find({}).then(function(iirs){
    //     res.send(iirs);
    // });
    Iir.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(iirs){
        res.send(iirs);
    });
    // Iir.geoNear({type : "Point",coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    // {
    //     maxDistance: 100000,
    //     spherical: true
    // }).then(function(iirs){
    //     res.send(iirs);
    // });
});

// add a new IIR to the db
router.post('/iirs', function(req,res, next){
    Iir.create(req.body).then(function(iir){
        res.send(iir);
    }).catch(next);
    // var iir  = new Iir(req.body);
    // iir.save();
});
// update a IIR in the db
router.put('/iirs/:id', function(req,res, next){
    Iir.findByIdAndUpdate({_id :req.params.id}, req.body).then(function(){
        Iir.findOne({_id :req.params.id}).then(function(iir){
            res.send(iir);
        });
    });
});

// delete a IIR from the db
router.delete('/iirs/:id', function(req,res, next){
    Iir.findByIdAndRemove({_id :req.params.id}).then(function(iir){
        res.send(iir);
    });
    // console.log(req.params.id);
    // res.send({type: 'DELETE'});
    
});

module.exports = router;