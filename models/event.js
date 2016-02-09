var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  city:        String,
  location:    String,
  date:        String,
  time:        String,
  category:    String,
  image:       String  
});

module.exports = mongoose.model('Event', eventSchema);