from flask import Flask, request, make_response
from flask_cors import cross_origin
import json
import uuid

app = Flask(__name__)

@app.route('/', methods = ['GET', 'POST'])
@cross_origin(headers=['Content-Type'])
def index():
    return open('../index.html')

@app.route('/devices/CMS\'s', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def auth():
    req = request.get_json()
    return json.load(open('CMS.json'))

@app.route('/devices/PINs', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def changePIN():
    req = request.get_json()
    response = make_response('PIN has been changed')
    response.mimetype = 'text/plain'
    return response

@app.route('/devices/PEM', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def getCertificate():
    req = request.get_json()
    return json.load(open('PEM.json'))
    

@app.route('/devices/certificates', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def getCertificateInfo():
    req = request.get_json()
    return json.load(open('certificate.json'))

@app.route('/devices/login', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def login():
    req = request.get_json()
    return json.load(open('login.json'))

if __name__ == '__main__':
    app.run()