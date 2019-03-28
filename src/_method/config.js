// let token = localStorage.getItem("user");
function getHeaders(token){
  let headers = !token ? {
    'Access-Control-Allow-Origin':'*',
    "Content-Type": "application/json",
  } : {
    'Access-Control-Allow-Origin':'*',
    "Content-Type": "application/json",
    "Authorization": `${token}`
  }
  return headers
}
function getHeadersv2(token){
  let headers = !token ? {
    'Access-Control-Allow-Origin':'*',
  } : {
    'Access-Control-Allow-Origin':'*',
    "Authorization": `${token}`
  }
  return headers
}
export const config= {
    endpoint: "http://192.168.0.102:3000/api",
    auth: "http://192.168.0.102:3000/authentication",
    getUrlParams: function(url,params){
      let query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
      return `${url}?${query}`;
    },
    getconfig: function(){
	return {
		method: 'GET',
		mode: 'cors',
		headers: getHeaders(localStorage.getItem('user'))
	}
    },
    postdataconfig: function(data){
      let result = {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(localStorage.getItem('user')),
        body: JSON.stringify(data)
      }
      return result
    },
    postdatafile: function(data){
      let result = {
        method: 'POST',
        mode: 'cors',
        headers: getHeadersv2(localStorage.getItem('user')),
        body: data
      }
      return result
    },
    putdataconfig: function(data){
      let result = {
        method: 'PUT',
        mode: 'cors',
        headers: getHeaders(localStorage.getItem('user')),
        body: JSON.stringify(data)
      }
      return result;
    },
    postconfig: {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(localStorage.getItem('user'))
    },
    deleteconfig: {
        method: 'DELETE',
        mode: 'cors',
        headers: getHeaders(localStorage.getItem('user'))
    },
    putconfig: {
        method: 'PUT',
        mode: 'cors',
        headers: getHeaders(localStorage.getItem('user'))
    }
}
