const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);


// Define a new route for handling form submissions
app.post("/api/catalogue", (req, res) => {
  // Assuming the form data is sent as JSON
  const { email, name } = req.body;

  // Here you can process the form data as needed, such as saving to a database
  // For demonstration, we'll just log the received data
  console.log("Received form data:", { email, name });

  // Sending a success response
  res.json({ success: true });
});

// Define a new route for handling form submissions
app.post("/api/contactus", (req, res) => {
  // Assuming the form data is sent as JSON
  const { email, name } = req.body;

  // Here you can process the form data as needed, such as saving to a database
  // For demonstration, we'll just log the received data
  console.log("Received form data:", { email, name });

  // Sending a success response
  res.json({ success: true });
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
