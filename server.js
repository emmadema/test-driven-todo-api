// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

 //the routes is what is broken

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

//this one works
app.get('/api/todos', function index(req, res) {//Done
  /* This endpoint responds with all of the todos
      1) should respond with status 200
      2) should respond with a JSON object
      3) should respond with a JSON object containing a list of todos
      4) todo objects should have properities: _id, description, task
   */
   //start with this one
   //need to send a JSON object = res.json({});-empty object
   res.json({todos : todos});
   //this is the JSON object with all the todos in it from the srray above
});


app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  
  todos.push(req.body.id++);
  res.json(req.body);
});

//this one works
app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
    //get todo by the id
    //run through the todo as
    for (i=0; i < todos.length; i++) {
      if (todos[i]._id == req.params.id) {
        return res.json(todos[i]).save();
      }
    }
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
    for (i=0; i < todos.length; i++) {
      if (todos[i]._id == req.params.id) {
        var todo = todos[i];
        todo[i].task = req.params.task;
        todo[i].description = req.params.description;
        todo[i].id = todos.length++;
      todos.push(todo[i]);
      res.json(todo[i]);
      }
   }
});


app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   for (var i = 0; i<todos.length; i++){
    if (todos[i].id == req.params.id) {
    delete todos[i];
    }
   }
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
