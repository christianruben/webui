import { config } from './config';

function authentication(username, password, callback){
    let result = {
        json: null,
        err: null
    }
    fetch(`${config.auth}/login`, config.postdataconfig({username: username, password: password})).then(res=>{
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

export const login = {
    authentication
}