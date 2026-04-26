const express =require('express');
const URL = require('../models/url');
const route = express.Router();

route.get('/',async (req,res)=>{
  const allUrls = await URL.find({});
  return res.render('home',{
    urls:allUrls
  });
})
module.exports=route;