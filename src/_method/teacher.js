import {config} from './config';

function list(index, rows, search, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.endpoint}/`, config.config).then(res=>{
        return res.json();
    }).then(json=>{
        result.json = json;
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    })
}

function insert(data, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.endpoint}/`, config.postconfig).then(res=>{
        return res.json();
    }).then(json=>{
        result.json = json;
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    });
}

function del(id, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.endpoint}/`, config.deleteconfig).then(res=>{
        return res.json();
    }).then(json=>{
        result.json = json;
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    });
}

function update(data, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.endpoint}/`, config.putconfig).then(res=>{
        return res.json();
    }).then(json=>{
        result.json = json;
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    });
}

function upload(data, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.endpoint}`, config.putconfig).then(res=>{
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
    list,
    insert,
    del,
    update,
    upload
}