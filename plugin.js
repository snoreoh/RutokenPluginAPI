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
        }).then(respData => {
            if ('message' in respData){
                return Promise.reject(new Error(respData['message']))    
            }
            return respData['response'];
        })
    }
}