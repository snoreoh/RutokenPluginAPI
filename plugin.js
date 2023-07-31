class CryptoPlugin{
    
    constructor(errorCodes, valid, version){
        this.errorCodes = errorCodes;
        this.valid = valid;
        this.version = version;
    }

    async enumerateDevices(options){
        return await this.request(JSON.stringify({
            "operationID": "enumerateDevices",
            "parameters": {
                'options': options
            }}))
    }

    async enumerateKeys(deviceId, marker = ''){
        return await this.request(JSON.stringify({
            "operationID": "enumerateKeys",
            "parameters": {
                'deviceId': deviceId,
                'marker': marker
            }})).then(data =>{
                return data["keys"]
            })
    }

    async enumerateCertificates(deviceId, category = 'CERT_CATEGORY_UNSPEC'){
        return await this.request(JSON.stringify({ 
            "operationID": "enumerateCertificates",
            "parameters": {
                'deviceId': deviceId,
                'category': category
            }})).then(data => {
                return data['certificates']
            })
    }

    async getDeviceInfo(deviceId, option = 'TOKEN_INFO_MODEL'){
        await this.request( JSON.stringify({
            "operationID": "getDeviceInfo",
            "parameters": {
                'deviceId': deviceId,
                'option': option
            }}))
    }

    async getKeyLabel(deviceId, keyId){
        return await this.request(JSON.stringify({
            "operationID": "getKeyLabel",
            "parameters": {
                'deviceId': deviceId,
                'keyId': keyId
            }})).then(data =>{
                return data["label"]
            })
    }

    async parseCertificate(deviceId, certId){
        return await this.request(JSON.stringify({
            "operationID": "parseCertificate",
            "parameters": {
                'deviceId': deviceId,
                'certId': certId
            }}))
    }

    //Create request to the server and handle errors from it
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
        }).then(respData => {
            if ('message' in respData){
                return Promise.reject(new Error(respData['message']))    
            }
            return respData;
        })
    }

}

// Test Input
//_plugin = new CryptoPlugin();

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
//     alert(data['info'])
// }, function(error){
//     alert(error.message)
// });
// _plugin.getKeyLabel(852752315, "1633789ccf142cc7").then(data => {
//     alert(data)
// }, function(error){
//     alert(error.message)
// });
// _plugin.parseCertificate(852752315, "reer6f56a65a5c6awfd").then(data => {
//     alert(data['category'])
// }, function(error){
//     alert(error.message)
// });