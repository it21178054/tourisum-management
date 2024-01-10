const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "100mb" }));
const mongoUrl =
  "mongodb+srv://nimasha:nimasha@cluster0.8kbj9hd.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => console.log(e));

app.use(cors()); // Add this line to enable CORS for all routes

app.listen(5000, () => {
  console.log("server started");
});

require("./eventDetails");
const eventInfo = mongoose.model("eventInfo");
app.post("/Formset", async (req, res) => {
  const { name, date, place, count, email, telephone } = req.body;
  try {
    await eventInfo.create({
      name,
      date,
      place,
      count,
      email,
      telephone,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//get event data in to web page
app.get("/EventData", async (req, res) => {
  try {
    const events = await eventInfo.find();
    res.send({ status: "ok", data: events });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});
//delete event data
app.delete("/deleteEvent/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eventInfo.deleteOne({ _id: id });
    res.send({ status: "ok", data: "Event deleted successfully" });
  } catch (error) {
    res.send({ status: "error", data: "Failed to delete event" });
  }
});

//Admin event form insert
require("./adminEventDetails");
const adminEventInfo = mongoose.model("adminEventInfo");
app.post("/AdminForm", async (req, res) => {
  const { name, location, date, image, Description } = req.body;
  try {
    await adminEventInfo.create({
      name,
      location,
      date,
      image,
      Description,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
//get event data in to web page
app.get("/AdminFormset", async (req, res) => {
  try {
    const events = await adminEventInfo.find();
    res.send({ status: "ok", data: events });
  } catch (error) {
    console.log(error);
    res.send({ status: "error" });
  }
});
//delete event data
app.delete("/deleteEvent/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await adminEventInfo.deleteOne({ _id: id });
    res.send({ status: "ok", data: "Event deleted successfully" });
  } catch (error) {
    res.send({ status: "error", data: "Failed to delete event" });
  }
});

