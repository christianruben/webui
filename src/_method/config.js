let url = {
    endpoint: "http://localhost:3000/api",
    auth: "http://localhost:3000/authentication",
    config: {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      },
    postconfig: {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
    },
    deleteconfig: {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
    },
    putconfig: {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
    }
}

module.exports = url;