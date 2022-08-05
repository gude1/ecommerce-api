const mongoose = require("mongoose");
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useCreateIndex: true,
};

exports.connectToDb = async (url) => {
  try {
    await mongoose.connect(url, config);
    console.log("database connected");
  } catch (err) {
    throw new Error(`database connection failed` + err);
  }
};
