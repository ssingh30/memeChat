const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
const gm = require('gm');
app.use(express.static('public'));
app.listen(5568);
app.use(bodyParser.json({limit: '500mb'}));
app.use(cookieParser());
let cookieMeme= {};
app.use((req, res, next)=>{
		if(!req.cookies || !req.cookies.name) res.cookie('name', Date.now());
		next();
		});
app.post('/pic', (req, res)=>{
		let randomNum = Math.floor((Math.random()*100)+1);
		let picPath =`${__dirname}/public/images/picture${randomNum}.png`;
		let picData = req.body.canvas;
		fs.writeFile(picPath, picData, 'base64', ()=>{
				gm(picPath).fontSize(10).drawText(0,70, req.body.comment).write(picPath,(err)=>{});
				})
		cookieMeme[req.cookies.name]= `picture${randomNum}.png`;
		res.send('You took a picture');
		});
app.get('/pic', (req, res)=>{
		res.send(cookieMeme);
		});
