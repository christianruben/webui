let token = localStorage.getItem("user");
let headers = !token ? {
  'Access-Control-Allow-Origin':'*',
  "Content-Type": "application/json",
  "Accept": "application/json"
} : {
  'Access-Control-Allow-Origin':'*',
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${token}`
}
export const config= {
    endpoint: "http://localhost:3000/api",
    auth: "http://localhost:3000/authentication",
    getconfig: {
      method: 'GET',
      mode: 'cors',
      headers: headers
    },
    getUrlParams: function(url,params){
      let query = Object.keys(params).map(k => `${encodeURIComponent(k)} = ${encodeURIComponent(params[k])}`).join('&');
      return `${url}?${query}`;
    },
    postdataconfig: function(data){
      let result = {
        method: 'POST',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(data)
      }
      return result
    },
    putdataconfig: function(data){
      let result = {
        method: 'PUT',
        mode: 'cors',
        headers: headers,
        body: JSON.stringify(data)
      }
      return result;
    },
    postconfig: {
        method: 'POST',
        mode: 'cors',
        headers: headers
    },
    deleteconfig: {
        method: 'DELETE',
        mode: 'cors',
        headers: headers
    },
    putconfig: {
        method: 'PUT',
        mode: 'cors',
        headers: headers
    }
}