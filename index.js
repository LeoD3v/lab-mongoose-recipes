const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    Recipe.deleteMany().then(() => {
      
    })
    // return Recipe.deleteMany();
  })

  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log(`${data} recipe inserted`);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((result) => {
    if (result.deletedCount > 0) {
      console.log(`Carrot Cake was deleted`);
    } else console.log("Carrot Cake was NOT deleted");
  })
  .catch((err) => {
    console.log(`Data was NOT inserted ${err}`);
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
      // { new: true },
      // (error, result) => {
      //   if (error) {
      //     console.log(`Recipe duration did not update: ${error}`);
      //   } else console.log(`Recipe duration was UPDATED!${result}`);
      // }
    ).exec();
  })
  .then((update) => {
    console.log(`the updated object:${update} was successful`);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log("Mongoose connection disconnected !");
    });
  });
