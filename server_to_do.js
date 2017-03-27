var express= require('express');

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	discription: 'Firsrt Case',
	completed : false
},{
	id: 2,
	discription: '2nd Case',
	completed : false
},{
	id: 3,
	discription: '3rd Case',
	completed : true
}];

app.get('/todos',function(req,res){
	res.json(todos);
	res.send('TO DO APLLICATION');
}); 


app.get('/',function(req,res){
	res.send('TO DO APLLICATION');
}); 


app.listen(PORT,function(req,res){
	console.log('Listening on port : '+PORT+' !!');
}); 