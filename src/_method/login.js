const config = require('./config');

function authentication(username, password, callback){
    let result = {
        json: null,
        err: null
    }
    let conf = config.url.postconfig.body = {username: username, password: password}
    fetch(`${config.url.auth}/login`, config.url.postconfig).then(res=>{
        // fetch body response to json
        return res.json();
    }).then(json=>{
        result.json = json;
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    });
}

module.exports = {
    authentication
}