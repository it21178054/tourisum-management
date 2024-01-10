const mongoose = require("mongoose");
const eventDetailsSchema = new mongoose.Schema(
  {
    name: String,
    date: String,
    place: String,
    count: String,
    email: String,
    telephone: String,
  },
  {
    collection: "eventInfo",
  }
);
mongoose.model("eventInfo", eventDetailsSchema);
