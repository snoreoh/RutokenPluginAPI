class CryptoPlugin{
    
    constructor(errorCodes, valid, version){
        this.errorCodes = errorCodes;
        this.valid = valid;
        this.version = version;
    }

    async enumerateDevices(options){
        return await this.request(JSON.stringify({
            "operationID": "enumerateDevices",
            "parameters": [{
                'options': options
            }]})).then(data =>{
                return data[`${options}`]
            })
    }

    async enumerateKeys(deviceId, marker = ''){
        return await this.request(JSON.stringify({
            "operationID": "enumerateKeys",
            "parameters": [{
                'deviceId': deviceId,
                'marker': marker
            }]})).then(data =>{
                return data["keys"]
            })
    }

    async enumerateCertificates(deviceId, category){
        return await this.request(JSON.stringify({ 
            "operationID": "enumerateCertificates",
            "parameters": [{
                'deviceId': deviceId,
                'category': category
            }]})).then(data =>{
                return data["certificates"]
            })
    }

    async getDeviceInfo(deviceId, option){
        await this.request( JSON.stringify({
            "operationID": "getDeviceInfo",
            "parameters": [{
                'deviceId': deviceId,
                'option': option
            }]})).then(data =>{
                return data[`${option}`]
            })
    }

    async getKeyLabel(deviceId, keyId){
        return await this.request(JSON.stringify({
            "operationID": "getKeyLabel",
            "parameters": [{
                'deviceId': deviceId,
                'keyId': keyId
            }]})).then(data =>{
                return data["label"]
            })
    }

    async parseCertificate(deviceId, certId){
        return await this.request(JSON.stringify({
            "operationID": "parseCertificates",
            "parameters": [{
                'deviceId': deviceId,
                'certId': certId
            }]})).then(data =>{
                return data["devices"];
            })
    }

    //Create request to the server and handle errors from server
    async request(jsonData){
        return await fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: jsonData
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
            }
            return response.json();
        }).catch(error => {
            console.error("Error: ", error)
        }).then(reqData => {
            if ('message' in reqData){
                return Promise.reject(new Error(reqData['message']))    
            }
            return reqData;
        })
    }

}

// Test Input
// _plugin = new CryptoPlugin();

// _plugin.enumerateDevices("ENUMERATE_DEVICES_EVENTS").then(data =>{
//     alert(data["connected"])
// }, function(error){
//     alert(error.message)
// });
// _plugin.enumerateCertificates(49531827, ["CERT_CATEGORY_USER", "CERT_CATEGORY_CA"]).then(data => {
//     alert(data)
// }, function(error){
//     alert(error.message)
// });