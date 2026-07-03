const express=require('express');const axios=require('axios');require('dotenv').config();
const app=express();app.set('view engine','pug');app.set('views','./views');app.use(express.static('public'));app.use(express.urlencoded({extended:true}));
const PRIVATE_APP_TOKEN=process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN;const OBJECT_TYPE='YOUR_CUSTOM_OBJECT_TYPE_ID';
app.get('/',async(req,res)=>{try{const r=await axios.get(`https://api.hubapi.com/crm/v3/objects/${OBJECT_TYPE}?properties=name,publisher,price`,{headers:{Authorization:`Bearer ${PRIVATE_APP_TOKEN}`}});res.render('homepage',{title:'Custom Object Table',data:r.data.results});}catch(e){res.status(500).send('Error fetching data');}});
app.get('/update-cobj',(req,res)=>res.render('updates',{title:'Update Custom Object'}));
app.post('/update-cobj',async(req,res)=>{try{await axios.post(`https://api.hubapi.com/crm/v3/objects/${OBJECT_TYPE}`,{properties:req.body},{headers:{Authorization:`Bearer ${PRIVATE_APP_TOKEN}`}});res.redirect('/');}catch(e){res.status(500).send('Error creating');}});
app.listen(3000,()=>console.log('http://localhost:3000'));