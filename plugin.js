function authenticate(deviceId, certId, salt){
    fetch('http://127.0.0.1:5000/devices/CMS\'s', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'deviceID': deviceId, 
            'certID': certId,
            'salt': salt})
    }).then(response => {
        if(!response.ok){
            return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
        }
        return response.json();
    }).then(data => {
        //Processing data received from the server
        alert(data['CMS']);
    }).catch(error => {
        console.error('Error: ', error);
    });
}

function changePIN(deviceId, authPIN, newPIN, options){
    fetch('http://127.0.0.1:5000/devices/PINs', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'deviceID': deviceId,
            'authPIN': authPIN,
            'newPIN': newPIN,
            'options': options
        })
    }).then(response => {
        if(!response.ok){
            return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
        }
        return response.text();
    }).then(data =>{
        alert(data)
    }).catch(error => {
        console.error('Error: ', error);
    });
}

function getCertificate(deviceId, certId){
    fetch('http://127.0.0.1:5000/devices/PEM', 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'deviceID': deviceId, 
            'certID': certId
        })
    }).then(response => {
        if(!response.ok){
            return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
        }
        return response.json();
    }).then(data => {
        alert(data['PEM'])
    }).catch(error => {
        console.error('Error: ', error);
    });
}

function getCertificateInfo(deviceId, certId, options){
    fetch('http://127.0.0.1:5000/devices/certificates', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'deviceID': deviceId, 
            'certID': certId,
            'options': options
        })
    }).then(response => {
        if(!response.ok){
            return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
        }
        return response.json();
    }).then(data => {
        alert(data['TOKEN_INFO_MODEL'])
    }).catch(error => {
        console.error('Error: ', error);
    });
}

function login(deviceId, pin){
    fetch('http://127.0.0.1:5000/devices/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            'deviceID': deviceId, 
            'PIN': pin
        })
    }).then(response => {
        if(!response.ok){
            return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
        }
        return response.json();
    }).then(data => {
        alert(data['deviceID'])
    }).catch(error => {
        console.error('Error: ', error);
    });
}

authenticate(1432123, '222333', '1234567');
changePIN(1432123, '222333', '1234567', ["123213213", "dsfdfsdf"]);
getCertificate('dadasd', 'xzxzxzxzzx');
getCertificateInfo('dadasdasd','xzxzzxzxzx', ['212143', 414214124]);
login('sasasa', '22412421412');