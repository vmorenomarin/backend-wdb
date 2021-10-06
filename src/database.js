const mongoose = require("mongoose");

// En la siguiente variable se guarda la dirección de conexión de mongoDB localmente.

const URI = "mongodb://localhost/testcrud";

const conn = async () => {
  try {
    const db = await mongoose.connect(URI);
    console.log("Database connected.");
  } catch (error) {
    console.log(error.message);
  }
};

// mongoose
//   .connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then((db) => console.log("Database connected."))
//   .catch((error) => console.log(error.message));

// module.exports = mongoose;

module.exports = conn();
