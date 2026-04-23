const express = require("express");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connect");
const URL = require('./models/url');
const PORT = 8001;
const app = express();

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected"),
);

app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortID",async (req,res)=>{
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
