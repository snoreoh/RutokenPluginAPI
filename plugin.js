class CryptoPlugin{
    
    async enumerateDevices(options){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationID": 1,
                "parameters": [{
                    'options': options
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.json();
        }).catch(error => {
            console.error("Error: ", error)
        });
    }

    async enumerateKeys(deviceId, marker){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationID": 2,
                "parameters": [{
                    'deviceId': deviceId, 
                    'marker': marker
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.json();
        }).catch(error => {
            console.error("Error: ", error)
        });
    }

    async enumerateCertificates(deviceId, category){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationID": 3,
                "parameters": [{
                    'deviceID': deviceId, 
                    'category': category
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.json();
        }).catch(error => {
            console.error("Error: ", error)
        });
    }

    async savePin(deviceId){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationID": 4,
                "parameters": [{
                    'deviceID': deviceId
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.text();
        }).catch(error => {
            console.error("Error: ", error)
        });
    }

    async removePin(deviceId){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationID": 5,
                "parameters": [{
                    'deviceID': deviceId
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.text();
        }).catch(error => {
            console.error("Error: ", error)
        });
    }

    async changePIN(deviceId, authPIN, newPIN, options){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "operationID": 6,
                "parametrs": [{
                    'deviceID': deviceId,
                    'authPIN': authPIN,
                    'newPIN': newPIN,
                    'options': options
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.text();
        }).catch(error => {
            console.error('Error: ', error);
        });
    }

    async login(deviceId, pin){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationID": 7,
                "parameters": [{
                    'deviceID': deviceId, 
                    'PIN': pin
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.text();
        }).catch(error => {
            console.error("Error: ", error)
        });
    }

    async logout(){
        return fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationID": 8,
                "parameters": [{
                    'deviceID': deviceId, 
                    'PIN': pin
                }]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.text();
        }).catch(error => {
            console.log("Error: ", error)
        });
    }

}

// // Test Input
// _plugin = new CryptoPlugin();

// _plugin.login(49531827, 12234).then(data => {
//     alert(data)
// });

// _plugin.enumerateCertificates(49531827, "CERT_CATEGORY_USER, CERT_CATEGORY_CA").then(data => {
//     alert(data["certificates"])
// })