var Event   = require('../models/event');

function eventsIndex(req, res) {
  Event.find(function(err, events){
    if (err) return res.status(404).json({message: 'Something went wrong with retrieving all events.'});
    res.status(200).json({ events: events });
  });
}

function eventsShow(req, res){
  Event.findById(req.params.id, function(err, event){
    if (err) return res.status(404).json({message: 'Something went wrong with retrieving a event.'});
    res.status(200).json({ event: event });
  });
}

function eventsUpdate(req, res){
  Event.findById(req.params.id,  function(err, event) {
    if (err) return res.status(500).json({message: "Something went wrong with updating this event."});
    if (!event) return res.status(404).json({message: 'No such event found.'});

    if (req.body.email) event.local.email = req.body.name;
    if (req.body.password) event.local.password = req.body.password;

    event.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong when saving this update."});

     res.status(201).json({message: 'This event has been successfully updated.', event: event});
   });
  });
}

function eventsDelete(req, res){
  Event.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'This event has been successfully deleted.'});
 });
}

module.exports = {
  eventsIndex:  eventsIndex,
  eventsShow:   eventsShow,
  eventsUpdate: eventsUpdate,
  eventsDelete: eventsDelete
}