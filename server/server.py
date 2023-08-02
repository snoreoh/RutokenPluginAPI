from flask import Flask, request, make_response
from flask_cors import cross_origin
import json


class plugin:

    def __init__(self) -> None:
        self.jsonData = {}
        self.errorCodes = {
            'FUNCTION_FAILED': "1",
            'DEVICE_NOT_FOUND': "2",
            'KEY_NOT_FOUND': "3",
            'CERTIFICATE_CATEGORY_BAD': "4",
            'CERTIFICATE_NOT_FOUND': "5" 
        }
    
    def setJsonData(self, file):
        try:
            f = open(f'{file}.json')
            self.jsonData = json.load(f)
            f.close()
            return 0
        except:
            return self.errorResponse('FUNCTION_FAILED')   

    def errorResponse(self, error):
        return json.dumps({
            'message': self.errorCodes[error]
        })
    
    def response(self, response):
        return json.dumps({
            "response": response
        })
    
    def enumerateDevices(self, options):
        return self.response(self.jsonData[options])

    
    def enumerateKeys(self, deviceId, marker = ''):
        for device in self.jsonData:
            if device['deviceId'] == deviceId:
                keys = []
                for key in device['keys']:
                    if marker != "":
                        if marker == key['marker']:
                            keys.append(key['keyId'])
                        continue
                    keys.append(key['keyId'])

                if not keys:
                    return self.errorResponse('KEY_NOT_FOUND')
                
                return self.response(keys)

        return self.errorResponse('DEVICE_NOT_FOUND')

    def enumerateCertificates(self, deviceId, category = 'CERT_CATEGORY_UNSPEC'):
        if category not in ["CERT_CATEGORY_UNSPEC", "CERT_CATEGORY_USER", "CERT_CATEGORY_CA", "CERT_CATEGORY_OTHER"]:
            return self.errorResponse('CERTIFICATE_CATEGORY_BAD')
        
        for device in self.jsonData:
            
            if device['deviceId'] == deviceId:
                certificates = []
                for certificate in device['certificates']:
                    if category != "CERT_CATEGORY_UNSPEC":
                        if category == certificate['category']:
                            certificates.append(certificate['certificateId'])
                        continue
                    certificates.append(certificate["certificateId"])
                
                if not certificates:
                    return self.errorResponse('CERTIFICATE_NOT_FOUND')
                
                return self.response(certificates)
            
        return self.errorResponse('DEVICE_NOT_FOUND')

    def getDeviceInfo(self, deviceId, option = 'TOKEN_INFO_MODEL'):
        for device in self.jsonData:
            if device['deviceId'] == deviceId:
                    return self.response(device['info'][option])
            
        return self.errorResponse('DEVICE_NOT_FOUND')


    def getKeyLabel(self, deviceId, keyId):
        for device in self.jsonData:
            if device['deviceId'] == deviceId:
                for key in device['keys']:
                    if key['keyId'] == keyId:
                        return self.response(key['label'])
                    
                return self.errorResponse('KEY_NOT_FOUND')
        
        return self.errorResponse('DEVICE_NOT_FOUND')


    def parseCertificate(self, deviceId, certId):
        for device in self.jsonData:
            if device['deviceId'] == deviceId:
                for certificate in device['certificates']:
                    if certificate['certificateId'] == certId:
                        return self.response([
                            certificate['category'],
                            certificate['handle']
                        ])
                
                return self.errorResponse('CERTIFICATE_NOT_FOUND')
            
        return self.response('DEVICE_NOT_FOUND')



app = Flask(__name__)

@app.route('/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def response():

    req = request.get_json()
    reqData = [req[key] for key in req]
    
    _plugin = globals()['plugin']()
    functionFile = getattr(_plugin, 'setJsonData')(reqData[0])

    if functionFile == 0:
        return getattr(_plugin, f'{reqData[0]}')(*tuple(reqData[1]))
    else:
        return functionFile
    

if __name__ == '__main__':
    app.run()