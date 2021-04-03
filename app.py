from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test',methods=['POST'])
def test_data():
    name = request.get_json()
    print('hello from flask',name)
    return"hello"

@app.route('/train',methods=['POST'])
def train_data():
    name = request.get_json()
    print('hello from flask',name['x_'])
    return"hello"
    
if __name__ == "__main__":
    app.run(host="localhost",port=5000,debug=True)