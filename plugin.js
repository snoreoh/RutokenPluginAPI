class CryptoPlugin{
    
    constructor(errorCodes, valid, version){
        this.errorCodes = errorCodes;
        this.valid = valid;
        this.version = version;
    }

    async enumerateDevices(options){
        return await this.request("enumerateDevices", Array.prototype.slice.call(arguments))
    }

    async enumerateKeys(deviceId, marker = ''){
        return await this.request("enumerateKeys", Array.prototype.slice.call(arguments))
    }

    async enumerateCertificates(deviceId, category = 'CERT_CATEGORY_UNSPEC'){
        return await this.request("enumerateCertificates", Array.prototype.slice.call(arguments))
    }

    async getDeviceInfo(deviceId, option = 'TOKEN_INFO_MODEL'){
        return await this.request("getDeviceInfo", Array.prototype.slice.call(arguments))
    }

    async getKeyLabel(deviceId, keyId){
        return await this.request("getKeyLabel", Array.prototype.slice.call(arguments))
    }

    async parseCertificate(deviceId, certId){
        return await this.request("parseCertificate", Array.prototype.slice.call(arguments))
    }

    //Create request to the server and handle errors from it
    async request(funcName, funcParameters){
        return await fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                "operationId": arguments[0],
                "arguments": arguments[1]
            })
        }).then(response => {
            if(!response.ok){
                return Promise.reject(new Error('6'));
            }
            return response.json();
        }).catch(error => {
            console.error("Error: ", error)
        }).then(respData => {
            if ('message' in respData){
                return Promise.reject(new Error(respData['message']))    
            }
            return respData['response'];
        })
    }
}

// Test Input
_plugin = new CryptoPlugin();
// _plugin.enumerateDevices("ENUMERATE_DEVICES_EVENTS").then(data =>{
//     alert(data["connected"])
// }, function(error){
//     alert(error.message)
// });
// _plugin.enumerateKeys(852752315).then(data =>{
//     alert(data)
// }, function(error){
//     alert(error.message)
// });
// _plugin.enumerateCertificates(852752315).then(data => {
//     alert(data)
// }, function(error){
//     alert(error.message)
// });
// _plugin.getDeviceInfo(852752315).then(data => {
//     alert(data)
// }, function(error){
//     alert(error.message)
// });
// _plugin.getKeyLabel(852752315, "1633789ccf142cc7").then(data => {
//     alert(data)
// }, function(error){
//     alert(error.message)
// });
// _plugin.parseCertificate(852752315, "reer6f56a65a5c6awfd").then(data => {
//     alert(data[0])
// }, function(error){
//     alert(error.message)
// });