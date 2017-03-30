var express= require('express');

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	discription: '1st Case',
	completed : false
},{
	id: 2,
	discription: '2nd Case',
	completed : false
},{
	id: 3,
	discription: '3rd Case',
	completed : true
},{
	id: 4,
	discription: '3rd Case',
	completed : true
}];

app.get('/todos',function(req,res){
	res.json(todos);
	
}); 

app.get('/todos/:id',function(req,res){
	var userId = parseInt(req.params.id,10);
	var matchID;
	todos.forEach(function(todo){
		if(userId === todo.id){
			matchID=todo;
		}
	});
	if(matchID){
		res.send(matchID);
	}else{
	res.status(404).send();
	}
}); 

app.get('/',function(req,res){
	res.send('TO DO APLLICATION');
}); 


app.listen(PORT,function(req,res){
	console.log('Listening on port : '+PORT+' !!');
}); 