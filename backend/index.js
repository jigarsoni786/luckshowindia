require('dotenv').config();
const express = require("express");
require("./db/config");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtKey = 'luckshowindia@1301';

const PORT = process.env.PORT;


const User = require('./db/User');
const Lottry = require('./db/Lottry');
const app = express();
app.use(cors());

app.use(express.json());
app.post("/luckindia", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  resp.send(result);
})

// API FOR LOGIN 

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {

    let user = await User.findOne(req.body).select("-email, -password");
    if (user) {
      jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          resp.send({ result: 'Something Went Wrong, Try Again Later' })
        }
        resp.send({ user, auth: token })
      })
    }
    else {
      resp.send({ result: "User Not Found" })
    }
  }
  else {
    resp.send({ result: "Invalid User" })
  }

})


// THIS IS THE ALL DATA PUT API 

app.post("/lottrys", async (req, resp) => {
  let lottry = new Lottry(req.body);
  let result = await lottry.save();
  resp.send(result);
});


// api route for card latest one dat

app.get("/lottry-data-latest", async (req, resp) => {
  try {
    const currentDate = new Date();
    const latestResults = {};

    // Fetch latest results for each quiz
    const lottryData = await Lottry.find({
      date: { $lte: currentDate.toISOString().slice(0, 10) }, // Ensure date is not greater than the current date
      endTime: { $lte: `${currentDate.getHours()}:${currentDate.getMinutes()}` }, // Ensure endTime is not greater than the current time
    });

    lottryData.forEach((item) => {
      if (!latestResults[item.quiz] || item.date >= latestResults[item.quiz].date) {
        latestResults[item.quiz] = item;
      }
    });

    const latestResultsArray = Object.values(latestResults);

    if (latestResultsArray.length > 0) {
      resp.send(latestResultsArray);
    } else {
      resp.send("No results found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resp.status(500).send("Internal Server Error");
  }
});


// api route for admin

app.get("/admin-lottry-data", async (req, resp) => {
  const lottrys = await Lottry.find();
  if (Lottry.length > 0) {
    resp.send(lottrys)
  }
  else {
    resp.send("no result found")
  }

})


// API ROUTE FOR Delete Items Functionality

app.delete("/lottrys/:id", async (req, resp) => {
  const deletedLottry = await Lottry.findByIdAndDelete(req.params.id);

  if (!deletedLottry) {
    return resp.status(404).json({ message: 'Lottry item not found' });
  }

  return resp.status(200).json({ message: 'Lottry item deleted successfully' });
});

// API ROUTE FOR GET update Items Functionality

app.get("/lottry-update/:id", async (req, resp) => {
  const result = await Lottry.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.status(404).send({ "result": "Not Found" });
  }
});

// API ROUTE FOR PUT update Items Functionality
app.put("/lottry-update/:id", async (req, resp) => {
  const result = await Lottry.updateOne({ _id: req.params.id }, { $set: req.body });
  resp.send(result)
});


// API ROUTE FOR SEARCH Items Functionality

app.get("/search/:date", async (req, resp) => {
  const selectedDate = req.params.date;
  const currentDate = new Date();
  const selectedDateTime = new Date(selectedDate);

  if (selectedDateTime > currentDate) {
    resp.send('No result');
  } else {
    // Get the current time in HH:mm format
    const currentHours = currentDate.getHours().toString().padStart(2, '0');
    const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;

    const result = await Lottry.find({
      date: selectedDate,
      endTime: { $lte: currentTime }
    });

    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.send('No result');
    }
  }
});



app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});




