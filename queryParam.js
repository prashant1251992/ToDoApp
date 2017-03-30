var express= require('express');

var bodyParser=require('body-parser');

var _=require("underscore");

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [];
var todosID =1;

app.use(bodyParser.json());

// app.get('/todos',function(req,res){
	// res.json(todos);
// }); 

// query Parameter
app.get('/todos',function(req,res){
	var queryParam = req.query;
	var filteredTodos = todos;
	if(queryParam.hasOwnProperty('completed') && queryParam.completed ==='true'){
		filteredTodos=_.where(filteredTodos,{completed:true});
	}else if(queryParam.hasOwnProperty('completed') && queryParam.completed ==='false'){
		filteredTodos=_.where(filteredTodos,{completed:false});
	}
	res.json(filteredTodos);
}); 



app.get('/todos/:id',function(req,res){
	var userId = parseInt(req.params.id,10);// here 10 is base means it is decimal
	var matchID=_.findWhere(todos,{id:userId});
	
	if(matchID){
		res.send(matchID);
	}else{
	res.status(404).send();
	}
}); 

app.delete('/todos/:id',function(req,res){
	var userId = parseInt(req.params.id,10); // here 10 is base means it is decimal
	var matchID=_.findWhere(todos,{id:userId});
	
	if(matchID){
		todos=_.without(todos,matchID);
		res.json(todos);
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
	body.id=todosID++;
	todos.push(body);
	res.json(body);
}); 

app.put('/todos/:id',function(req,res){
	var userId = parseInt(req.params.id,10); // here 10 is base means it is decimal
	var matchID=_.findWhere(todos,{id:userId});
	var body=_.pick(req.body,'description','completed');
	var validAttibute={};
	
	if(!matchID){
		return res.status(404).send('ID NOT FOUND');
	}
	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttibute.completed=body.completed;
	}else if(body.hasOwnProperty('completed')){
		return res.status(400).send('BAD REQUEST. PLease Enter Valid boolean value');
	}
	if(body.hasOwnProperty('description') && _.isString(body.description)){
		validAttibute.description=body.description;
	}else if(body.hasOwnProperty('description')){
		return res.status(400).send('BAD REQUEST. PLease Enter Valid String value');
	}
	_.extend(matchID,validAttibute);
	res.json(matchID);
}); 



app.listen(PORT,function(req,res){
	console.log('Listening on port : '+PORT+' !!');
}); 