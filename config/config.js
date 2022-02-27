
const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'thisismysecretkey',
        DATABASE: 'mongodb://localhost:27017/quizzDB'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}