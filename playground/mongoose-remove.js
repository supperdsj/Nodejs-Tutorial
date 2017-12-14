const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
// Todo.remove({}).then((result)=>{
//     console.log('removed',JSON.stringify(result,undefined,2));
// });

// Todo.findOneAndRemove({text:'test'}).then((todo)=>{
//     console.log(todo);
// });


// Todo.findByIdAndRemove('5a322eb456b9682d7dcfa37b').then((todo)=>{
//     console.log(todo);
// });