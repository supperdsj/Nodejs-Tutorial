let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    const config = require('./config.json');
    Object.assign(process.env, config[env]);
}

//
// console.log('env **** ', env);
// console.log('PORT **** ', process.env.PORT);
// console.log('MONGODB_URI **** ', process.env.MONGODB_URI);