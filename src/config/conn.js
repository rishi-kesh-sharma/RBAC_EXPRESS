const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then((conn) => {
    console.log(`connected to database`);
    // console.log(conn);
  })
  .catch((err) => {
    console.log(`cannot connect to database ${err.message}`);
  });
