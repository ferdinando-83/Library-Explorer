import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  address: String,
  city: String,
  state: String,
  zipcode: Number
});

module.exports = mongoose.model('Destinations', destinationSchema);
