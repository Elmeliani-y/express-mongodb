const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/parkings", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Access granted"))
  .catch(() => console.log("Connection failed"));

const parkingSchema = mongoose.Schema({
  _id: Number, 
  name: { type: String, required: true },
  type: String,
  city: String
}, { versionKey: false }); 

const Parking = mongoose.model("parking", parkingSchema);

module.exports = Parking;
