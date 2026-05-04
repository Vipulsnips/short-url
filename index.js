const express = require("express");
const connectToMongoDB = require("./connect");
const URL = require('./models/url');
const PORT = 8001;
const app = express();
const path = require('path');
const cookieParser = require('Cookie-parser');
const {restrictToLoggedInUserOnly,checkAuth} = require('./middlewares/auth');

const urlRoute = require("./routes/url");
const staticRouter = require('./routes/staticRouter');
const userRoute= require('./routes/user');

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected"),
);

//views
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/user",userRoute); 
app.use("/url", restrictToLoggedInUserOnly,urlRoute);
app.use("/",checkAuth,staticRouter);
app.get("/url/:shortID",async (req,res)=>{
  const shortId=req.params.shortID;
  const entry = await URL.findOneAndUpdate({shortId},{
    $push:{
      visitHistory:{
        timestamp: Date.now()
      }
    }
  });
  res.redirect(entry.redirectUrl);
})
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
