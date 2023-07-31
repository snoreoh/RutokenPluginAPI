from flask import Flask, request, make_response
from flask_cors import cross_origin
import json

app = Flask(__name__)


'''
List of error codes:
'''
FUNCTION_FAILED = "1"
DEVICE_NOT_FOUND = "2"
KEY_NOT_FOUND = "3"
CERTIFICATE_CATEGORY_BAD = "4"
CERTIFICATE_NOT_FOUND = "5"


@app.route('/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def response():

    req = request.get_json()
    operationId = req['operationID']

    try:
        f = open(f"{operationId}.json")
        jsonData = json.load(f)
    except:
        return json.dumps({
            "message": FUNCTION_FAILED
        })  
    
    if operationId == "enumerateDevices":
        return jsonData[req['parameters']['options']]
    
    deviceId = req['parameters']['deviceId']

    if operationId == "enumerateKeys":

        marker = req['parameters']['marker']

        for device in jsonData:
            if device['deviceId'] == deviceId:
                keys = []
                for key in device['keys']:
                    if marker != "":
                        if marker == key['marker']:
                            keys.append(key['keyId'])
                        continue
                    keys.append(key['keyId'])

                if not keys:
                    return json.dumps({
                        "message": KEY_NOT_FOUND
                    })
                
                return json.dumps({
                    'keys' : keys
                })

        return json.dumps({
            "message": DEVICE_NOT_FOUND
        })
        
    
    elif operationId == "enumerateCertificates":

        category = req['parameters']['category']
        
        if category not in ["CERT_CATEGORY_UNSPEC", "CERT_CATEGORY_USER", "CERT_CATEGORY_CA", "CERT_CATEGORY_OTHER"]:
            return json.dumps({
                        "message": CERTIFICATE_CATEGORY_BAD
                    })
        
        for device in jsonData:
            
            if device['deviceId'] == deviceId:
                certificates = []
                for certificate in device['certificates']:
                    if category != "CERT_CATEGORY_UNSPEC":
                        if category == certificate['category']:
                            certificates.append(certificate['certificateId'])
                        continue
                    certificates.append(certificate["certificateId"])
                                                   ##certificateId
                
                if not certificates:
                    return json.dumps({
                        "message": CERTIFICATE_NOT_FOUND
                    })
                
                return json.dumps({
                    'certificates' : certificates
                })

        return json.dumps({
            "message": DEVICE_NOT_FOUND
        })

    elif operationId == "getDeviceInfo":

        option = req['parameters']['option']

        for device in jsonData:
            if device['deviceId'] == deviceId:
                    return json.dumps({
                        'info': device['info'][option]
                    })
            
        return json.dumps({
            "message": DEVICE_NOT_FOUND
        })


    elif operationId == "getKeyLabel":

        keyId = req['parameters']['keyId']

        for device in jsonData:
            if device['deviceId'] == deviceId:
                for key in device['keys']:
                    if key['keyId'] == keyId:
                        return json.dumps({
                            'label': key['label']
                        }) 
                    
                return json.dumps({
                    "message": KEY_NOT_FOUND
                })
            
        return json.dumps({
            "message": DEVICE_NOT_FOUND
        })
    
    elif operationId == "parseCertificate":
        
        certificateId = req['parameters']['certId']

        for device in jsonData:
            if device['deviceId'] == deviceId:
                for certificate in device['certificates']:
                    if certificate['certificateId'] == certificateId:
                        return json.dumps({
                            "category": certificate['category'],
                            "handle": certificate['handle']
                        }) 
                
                return json.dumps({
                    "message": CERTIFICATE_NOT_FOUND
                })
            
        return json.dumps({
            "message": DEVICE_NOT_FOUND
        })
        

if __name__ == '__main__':
    app.run()