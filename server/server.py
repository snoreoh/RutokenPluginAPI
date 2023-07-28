from flask import Flask, request, make_response
from flask_cors import cross_origin
import json

app = Flask(__name__)

@app.route('/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def response():
    req = request.get_json()

    if req['operationID'] == 1:
        return json.load(open("devices.json"))
    
    elif req['operationID'] == 2:
        return json.load(open("keys.json"))
    
    elif req['operationID'] == 3:
        return json.load(open("certificates.json"))
    
    elif req['operationID'] == 4:
        response = make_response('PIN has been SAVED')
        response.mimetype = 'text/plain'
        return response
    
    elif req['operationID'] == 5:
        response = make_response('PIN has been REMOVED')
        response.mimetype = 'text/plain'
        return response
    
    elif req['operationID'] == 6:
        response = make_response('PIN has been CHANGED')
        response.mimetype = 'text/plain'
        return response
    
    elif req['operationID'] == 7:
        return json.load(open("login.json"))
    
    elif req['operationID'] == 8:
        response = make_response('Session is over')
        response.mimetype = 'text/plain'
        return response

if __name__ == '__main__':
    app.run()