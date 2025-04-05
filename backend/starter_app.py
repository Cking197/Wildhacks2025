from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
collection = db["messages"]

@app.route("/")
def hello():
    return jsonify(message="hello from your flask server!")

@app.route("/messages", methods=["POST"])
def save_message():
    data = request.get_json()
    collection.insert_one(data)
    return jsonify(message="message saved!")

@app.route("/messages", methods=["GET"])
def get_messages():
    messages = list(collection.find({}, {"_id": 0}))
    return jsonify(messages)

if __name__ == "__main__":
    app.run(debug=True)
