const express =require('express');
const URL = require('../models/url');
const route = express.Router();

route.get('/',async (req,res)=>{
  if(!req.user) return res.redirect('/login');
  const allUrls = await URL.find({createdBy:req.user._id});
  return res.render('home',{
    urls:allUrls
  });
});

route.get('/signup', (req,res)=>{
  return res.render("signup",{urls:null});
})
route.get('/login', (req,res)=>{
  return res.render("login",{urls:null});
})
module.exports=route;