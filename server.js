// server.js
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const path = require('path'); // Import the path module
const cors = require('cors');

connectDb();
const app = express();

const port = process.env.PORT || 7879;

app.use(cors());
app.use(express.json());
app.use("/api/clients", require("./routes/clientRoutes"));
// Configure Express to serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
