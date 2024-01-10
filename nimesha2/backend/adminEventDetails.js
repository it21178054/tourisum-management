const mongoose = require("mongoose");
const adminEventDetailsSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    date: String,
    image: String,
    Description: String,
  },
  {
    collection: "adminEventInfo",
  }
);
mongoose.model("adminEventInfo", adminEventDetailsSchema);
