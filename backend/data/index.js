const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {

    await mongoose.connect(`mongodb://${process.env.MUSER}:${process.env.MPASSWORD}@${process.env.MHOST}:${process.env.MPORT}/${process.env.MDATABASE}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

  } catch (e) {
    console.trace(e);
  }
})();

const Ads = require('./models/Ads.js');
const Users = require('./models/Users.js');
const Questions = require('./models/Questions.js');

module.exports = {
  Ads,
  Users,
  Questions
}