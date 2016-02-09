module.exports = {
  database: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/event-tracker',
  secret: process.env.EVENT_TRACKER_SECRET
}