var hint = 'best in the world';

function log(message){
    console.log('Message: ' + message);
}


//Export as function
module.exports = log;

//Export as object
module.exports.logging = log;