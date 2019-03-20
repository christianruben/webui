const config = require('./config');

function login(username, password, callback){
    fetch(`${config.auth}`, config.postconfig).then(res=>{
        return res.json();
    }).then(json=>{

    }).catch(err=>{

    });
}

function list(index, rows, callback){
    fetch(`${config.endpoint}`, config.config).then(res=>{
        return res.json();
    }).then(json=>{

    }).catch(err=>{

    });
}