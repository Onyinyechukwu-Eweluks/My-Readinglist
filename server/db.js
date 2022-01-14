const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.DATABASE_URL, options, (err, client) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log("Connected to DB");
  }
});
