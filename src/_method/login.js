import { config } from './config';

async function authentication(username, password, callback){
    let result = {
        json: null,
        err: null
    }
    let reqconf = config.postdataconfig({username: username, password: password})
    try{
        const response = await fetch(`${config.auth}/login`, reqconf)
        const fetchres = await response.json()
        if(response.status === 200){
            result.json = fetchres
        }else{
            result.err = fetchres.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

async function authenticationAdmin(username, password, callback){
    let result = {
        json: null,
        err: null
    }
    let reqconf = config.postdataconfig({username: username, password: password})
    try{
        const response = await fetch(`${config.auth}/admin/login`, reqconf)
        const fetchres = await response.json()
        if(response.status === 200){
            result.json = fetchres
        }else{
            result.err = fetchres.message
        }
    }catch(err){
        result.err = err
    }
    callback(result)
}

function checkup(callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.auth}/check`, config.postdataconfig({})).then(res=>{
        // fetch body response to json
        return {status: res.status, json: res.json()};
    }).then(resfetch=>{
        if(resfetch.status === 200) result.json = resfetch.json;
        else result.err = resfetch.json.message
        callback(result);
    }).catch(err=>{
        result.err = err;
        callback(result);
    });
}

export const login = {
    authentication,
    authenticationAdmin,
    checkup
}