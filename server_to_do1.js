var express= require('express');

var bodyParser=require('body-parser');

var _=require("underscore");

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [];
var todosID =1;

app.use(bodyParser.json());

app.get('/todos',function(req,res){
	res.json(todos);
}); 

app.get('/todos/:id',function(req,res){
	var userId = parseInt(req.params.id,10);
	var matchID=_.findWhere(todos,{id:userId});
	
	//var matchID;
	// todos.forEach(function(todo){
		// if(userId === todo.id){
			// matchID=todo;
		// }
	// });
	if(matchID){
		res.send(matchID);
	}else{
	res.status(404).send();
	}
}); 

app.post('/todos',function(req,res){
	var body=_.pick(req.body,'description','completed');
	
	if((!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().lenght==0)){
		
		return res.status(404).send('BAD REQUEST');
	}
	body.description=body.description.trim();
	body.EID=todosID++;
	todos.push(body);
	res.json(body);
}); 


app.listen(PORT,function(req,res){
	console.log('Listening on port : '+PORT+' !!');
}); 