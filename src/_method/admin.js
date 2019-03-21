import {config} from './config';

function login(username, password, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.auth}`, config.postconfig).then(res=>{
        return res.json();
    }).then(json=>{
        result.json = json;
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    });
}

function list(index, rows, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.endpoint}`, config.config).then(res=>{
        return res.json();
    }).then(json=>{
        result.json = json;
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    });
}

export const admin = {
    login,
    list
}