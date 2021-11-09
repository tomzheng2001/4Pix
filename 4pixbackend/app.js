const express = require("express");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const albumRoutes = require("./routes/album");
const photoRoutes = require("./routes/photos");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

require("dotenv").config();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(userRoutes);
app.use(authRoutes);
app.use(categoryRoutes);
app.use(albumRoutes);
app.use(photoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
