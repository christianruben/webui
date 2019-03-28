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
    endpoint: "http://localhost:3000/api",
    auth: "http://localhost:3000/authentication",
    getUrlParams: function(url,params){
      let query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
      return `${url}?${query}`;
    },
    getconfig: function(){
	return {
		method: 'GET',
		mode: 'cors',
		headers: getHeaders(window.$cookies.get('apitoken'))
	}
    },
    postdataconfig: function(data){
      let result = {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(window.$cookies.get('apitoken')),
        body: JSON.stringify(data)
      }
      return result
    },
    postdatafile: function(data){
      let result = {
        method: 'POST',
        mode: 'cors',
        headers: getHeadersv2(window.$cookies.get('apitoken')),
        body: data
      }
      return result
    },
    putdatafile: function(data){
      let result = {
        method: 'PUT',
        mode: 'cors',
        headers: getHeadersv2(window.$cookies.get('apitoken')),
        body: data
      }
      return result;
    },
    putdataconfig: function(data){
      let result = {
        method: 'PUT',
        mode: 'cors',
        headers: getHeaders(window.$cookies.get('apitoken')),
        body: JSON.stringify(data)
      }
      return result;
    },
    deletedataconfig: function(data){
      let result = {
        method: 'DELETE',
        mode: 'cors',
        headers: getHeaders(window.$cookies.get('apitoken')),
        body: JSON.stringify(data)
      }
      return result;
    },
    postconfig: {
        method: 'POST',
        mode: 'cors',
        headers: getHeaders(window.$cookies.get('apitoken'))
    },
    deleteconfig: {
        method: 'DELETE',
        mode: 'cors',
        headers: getHeaders(window.$cookies.get('apitoken'))
    },
    putconfig: {
        method: 'PUT',
        mode: 'cors',
        headers: getHeaders(window.$cookies.get('apitoken'))
    }
}
