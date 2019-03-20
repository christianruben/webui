const config = require('./config');

function list(index, rows, search, callback){
    fetch(`${config.endpoint}/`, config.config).then(res=>{
        return res.json();
    }).then(json=>{
        callback(json);
    }).catch(err=>{
        callback(err);
    })
}

function insert(data, callback){
    fetch(`${config.endpoint}/`, config.postconfig).then(res=>{
        return res.json();
    }).then(json=>{

    }).catch(err=>{

    });
}

function del(id, callback){
    fetch(`${config.endpoint}/`, config.deleteconfig).then(res=>{
        return res.json();
    }).then(json=>{

    }).catch(err=>{

    });
}

function update(data, callback){
    fetch(`${config.endpoint}/`, config.putconfig).then(res=>{
        return res.json();
    }).then(json=>{

    }).catch(err=>{

    });
}

function upload(data, callback){
    fetch(`${config.endpoint}`, config.putconfig).then(res=>{
        return res.json();
    }).then(json=>{

    }).catch(err=>{

    });
}

module.exports = {
    list,
    insert,
    del,
    update,
    upload
}