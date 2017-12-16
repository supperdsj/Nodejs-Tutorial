let env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if (env === production){
    const opbeat = require('opbeat').start();
}
console.log('env **** ',env);
console.log('PORT **** ',process.env.PORT);
console.log('MONGODB_URI **** ',process.env.MONGODB_URI);