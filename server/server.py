from flask import Flask, request, make_response
from flask_cors import cross_origin
import json
import random as rand

app = Flask(__name__)

@app.route('/', methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def response():
    req = request.get_json()
    try:
        f = open(f"{req['operationID']}.json")
        return json.load(f)
    except:
        return json.dumps({
            "message": f"{rand.randint(1, 20)}"
        })  

if __name__ == '__main__':
    app.run()