from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://admin:NUAdmin4321@cluster0.yospykr.mongodb.net/?appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

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
