var express= require('express');

var app = express();

var PORT=process.env.PORT || 3000;


app.get('/',function(req,res){
	res.send('TO DO APLLICATION');
}); 


app.listen(PORT,function(req,res){
	console.log('Listening on port : '+PORT+' !!');
}); 