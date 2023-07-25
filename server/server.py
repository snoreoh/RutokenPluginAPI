from flask import Flask, request
from flask_cors import cross_origin
import json
app = Flask(__name__)

@app.route('/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def index():
    '''
    req = request.get_json()
    print(req.get('deviceID'))
    print()
    return req
    '''
    _file = open('server.json')
    data = json.load(_file)['devices'] if


    _file.close()


@app.route('/devices/<int:dev_id>/certificate', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def auth():
    req = request.get_json()
    return req

@app.route('/devices/<int:dev_id>/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def changePIN():
    req = request.get_json()
    return 'changePIN()'

@app.route('/devices/<int:dev_id>/certificate', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def getCertificate():
    req = request.get_json()
    return 'getCertificate()'

@app.route('/devices/<int:dev_id>/certificate', methods = ['GET'])
@cross_origin(headers=['Content-Type'])
def getCertificateInfo():
    req = request.get_json()
    return 'getCertificateInfo()'

@app.route('/devices/<int:dev_id>/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def login():
    req = request.get_json()
    return 'login()'

if __name__ == '__main__':
    app.run()