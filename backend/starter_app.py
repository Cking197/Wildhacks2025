from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import ObjectId
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

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
users = db["users"]

@app.route("/createUser", methods=["POST"])
def create_user():
    try:
        data = request.get_json()
        result = users.insert_one(data)
        return jsonify(message="User created!", _id=str(result.inserted_id))
    except Exception as e:
        print("Error: ", e)
        return jsonify(message="Error: User not created"), 500

@app.route("/updateUser", methods=["POST"])
def update_user():
    try:
        data = request.get_json()
        user_id = ObjectId(data["_id"])  # assuming frontend sends _id as a string
        update_fields = {
            "name": data["name"],
            "pastHobbies": data["pastHobbies"],
            "activeHobbies": data["activeHobbies"],
            "location": data["location"],
            "availability": data["availability"]
        }
        users.updateOne({"_id": user_id}, {"$set": update_fields})
        return jsonify(message="User updated!")
    except Exception as e:
        print("Error: ", e)
        return jsonify(message="Error: User not updated"), 500

@app.route("/getUser", methods=["GET"])
def get_user():
    try:
        data = request.get_json()
        user_id = ObjectId(data["_id"])
        user = users.find_one({"_id": user_id})
        if user:
            user["_id"] = str(user["_id"])  # convert ObjectId to string for JSON
            return jsonify(user)
        else:
            return jsonify(message="User not found"), 404
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Error: User not found"), 500

@app.route("/deleteUser", methods=["GET"])
def delete_user():
    try:
        data = request.get_json()
        user_id = ObjectId(data["_id"])
        result = users.delete_one({"_id": user_id})
        if result.deleted_count == 1:
            return jsonify(message="User deleted!")
        else:
            return jsonify(message="User not found"), 404
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Error: User not deleted"), 500

if __name__ == "__main__":
    app.run(debug=True)
