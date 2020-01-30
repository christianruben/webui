import {config} from './config';

async function list({index, rows, search, sortby, sort}, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(
            config.getUrlParams(
                `${config.endpoint}/news`, 
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
        let response = await fetch(`${config.endpoint}/news`, config.postdatafile(data))
        let json = await response.json()
        if(response.status == 200){
            result.json = json.data
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function del(id, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(`${config.endpoint}/news`, config.deletedataconfig({id: id}))
        let json = await response.json()
        if(response.status == 200){
            result.json = json.data
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function update(data, callback){
    let result = {
        json: null,
        err: null
    }
    try{
        let response = await fetch(`${config.endpoint}/news`, config.putdatafile(data))
        let json = await response.json()
        if(response.status == 200){
            result.json = json.data
        }else{
            result.err = json.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
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

export const news = {
    list,
    insert,
    del,
    update,
    upload,
}
