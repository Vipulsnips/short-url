const {nanoid} = require('nanoid');
const URL =require('../models/url')
async function handleGenerateNewShortURL(req,res) {
  const shortId = nanoid(8);
  const body = req.body;
  if(!body.url) return res.status(400).json({error:'url is required'});
  await URL.create(
    {
      shortId:shortId,
      redirectUrl:body.url,
      visitHistory:[]
    }
  )
  return res.render('home',{
    id:shortId
  });
  return res.status(201).json({id:shortId});
}

async function handleGetAnalytics(req,res) {
  const shortId=req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({totalClicks : result.visitHistory.length , analytics:result.visitHistory})
}
module.exports ={
  handleGenerateNewShortURL,
  handleGetAnalytics
  
}