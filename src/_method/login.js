const config = require('./config');

function authentication(username, password, callback){
    fetch(`${config.auth}/login`, config.config).then(res=>{
        // fetch body response to json
        return res.json();
    }).then(json=>{
        callback(json, null);
    }).catch(err=>{
        callback(null, err);
    });
}

module.exports = {
    authentication
}