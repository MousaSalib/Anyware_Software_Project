const express = require("express");
const connectToDB = require('./config/connectToDB');
const cors = require("cors")
require('dotenv').config();

const app = express();
app.use(cors({origin: "*"}))
connectToDB()
app.use(express.json());

app.use('/api/auth', require("./routes/authRoutes.js"));
app.use('/api/announcement', require("./routes/announcementRoutes.js"));
app.use('/api/quiz', require("./routes/quizRoutes.js"))

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});




