function authenticate(deviceId, certId, salt){
    var data = JSON.stringify({'deviceID': deviceId, 
                                'certID': certId,
                                'salt': salt});
    fetch('http://127.0.0.1:5000', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        },
        body: data
    }).then(function(response){
        if(!response.ok){
            return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
        }
        return response.json();
    }).then(function(data){
        alert(data)
    }).catch(function(error){
        return alert('not GG');
    });

}

function changePIN(deviceId, authPIN, newPIN, options){
    fetch('http://127.0.0.1:5000', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*', 
            'Content-Type': 'application/json' 
        },
        body: data
    }).then(function(response){
        if(!response.ok){
            return Promise.reject(new Error('Response failed: ' + response.status + '(' + response.statusText + ')'));
        }
        return response.json();
    }).then(function(data){

    }).catch(function(error){
        return alert(error);
    });
}

function getCertificate(deviceId, certId){
    fetch('http://127.0.0.1:5000')
    .then(response => response.text())
    .then(response => alert(response));

    return certificateString
}

function getCertificateInfo(deviceId, certId, options){
    fetch('http://127.0.0.1:5000')
    .then(response => response.text())
    .then(response => alert(response));

    return certificateObject 
}

function login(deviceId, pin){
    fetch('http://127.0.0.1:5000')
    .then(response => response.text())
    .then(response => alert(response));
}

authenticate('fafasfas', '222333', '1234567');