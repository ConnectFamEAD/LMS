const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
require('dotenv').config()

// TODO:middleware
// Permitir CORS apenas para o domínio do frontend
const corsOptions = {
  origin: 'https://connect-fam-ead.vercel.app', // ou a URL do seu frontend
  credentials: true, // Permite cookies de sessão de resposta cruzada
  optionsSuccessStatus: 200 // Alguns navegadores antigos (IE11, vários SmartTVs) estrangulam 204
};



app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
//TODO: Routes

app.use("/auth", require("./routes/authRoute"));
app.use("/", require("./routes/courseRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/profile", require("./routes/profileRoute"));
app.use("/enroll-course", require("./routes/enrollRoute"));

//TODO: Deploy:

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//TODO: Database and server created

const PORT = process.env.PORT || 5000;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });
