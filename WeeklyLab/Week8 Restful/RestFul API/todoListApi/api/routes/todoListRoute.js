
module.exports = function (app){

    //import todoListController.js
    const todoList = require('../controllers/todoListController');
    
    
    // if the URL is 'a server'/tasks
    app.route('/tasks')
        // http method is GET then call method list_all_tasks
        .get(todoList.list_all_tasks) 
        // HTTP method is POST then call method create_a_tasks
        .post(todoList.create_a_task); 

    // if the URL is 'a server'/tasks/'an id of tasks'
    app.route('/tasks/:taskId') 
        // http method is GET then call method read_a_tasks
        .get(todoList.read_a_task)
        // http method is PUT then call method update_a_tasks
        .put(todoList.update_a_task)
        // http method is DELETE then call metod delete_a_tasks
        .delete(todoList.delete_a_task);
    }