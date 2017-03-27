var express= require('express');

var bodyParser=require('body-parser');
var app = express();

var PORT = process.env.PORT || 3000;

var todos = [];
var todosID =1;

app.use(bodyParser.json());

app.get('/todos',function(req,res){
	res.json(todos);
	//res.send('TO DO APLLICATION');
}); 

// app.get('/todos/:id',function(req,res){
	// var userId = parseInt(req.params.id,10);
	// var matchID;
	// todos.forEach(function(todo){
		// if(userId === todo.id){
			// matchID=todo;
		// }
	// });
	// if(matchID){
		// res.send(matchID);
	// }else{
	// res.status(404).send();
	// }
// }); 

app.post('/todos',function(req,res){
	var body=req.body;
	
	body.id=todosID++;
	todos.push(body);
	res.json(body);
}); 

// app.get('/',function(req,res){
	// res.send('TO DO APLLICATION');
// }); 


app.listen(PORT,function(req,res){
	console.log('Listening on port : '+PORT+' !!');
}); 