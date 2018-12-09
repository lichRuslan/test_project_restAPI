const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// create geolocation Shema 
const GeoSchema = new Schema({
    type : {
        type: String,
        default: "Point"
    },
    coordinates: {
        type:[Number],
        index:'2dsphere'
    }
});

// create iir Schema  & model 
const iirSchema = new Schema({
    name:{
        type : String,
        required : [true, 'The name must be filled'],
    },
    rank: {
        type:String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry : GeoSchema
});
const Iir = mongoose.model('iir', iirSchema);

module.exports = Iir;