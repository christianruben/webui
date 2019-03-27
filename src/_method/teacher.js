import {config} from './config';

async function list({index, rows, search, sortby, sort}, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(
            config.getUrlParams(
                `${config.endpoint}/teacher`, 
                {page: index, search: search, sortby: sortby, sort: sort, rows: rows}
                ),
            config.getconfig())
        let json = await response.json()
        if(response.status == 200){
            result.json = json.response
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function insert(data, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(`${config.endpoint}/teacher`, config.postdatafile(data))
        let json = await response.json()
        if(response.status == 200){
            result.json = json.response
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
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

export const teacher = {
    list,
    insert,
    del,
    update,
    upload
}
