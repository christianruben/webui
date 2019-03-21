export const config= {
    endpoint: "http://localhost:3000/api",
    auth: "http://localhost:3000/authentication",
    config: {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        "Content-Type": "application/json"
      }
    },
    postdataconfig: function(data){
      let result = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      return result
    },
    postconfig: {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json"
        }
    },
    deleteconfig: {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json"
        }
    },
    putconfig: {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          "Content-Type": "application/json"
        }
    }
}