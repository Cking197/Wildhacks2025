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
users = db["users"]

@app.route("/createUser", methods=["POST"])
def create_user():
    try:
        data = request.get_json()
        users.insert_one(data)
        return jsonify(message="User created!")
    except Exception as e:
        print("Error: ", e)
        return jsonify(message="Error: User not created")

@app.route("/updateUser", methods=["POST"])
def update_user():
    try:
        data = request.get_json()
        users.updateOne(
            {"_id": data["id"]},
            {$set: {
                "name": data["name"].
                "pastHobbies": data["pastHobbies"],
                "activeHobbies": data["activeHobbies"],
                "location": data["location"],
                "availability": data["availability"]
            }})
        return jsonify(message="User updated!")
    except Exception as e:
        print("Error: ", e)
        return jsonify(message="Error: User not updated")

@app.route("/getUser", methods=["GET"])
def get_user():
    try:
        data = request.get_json()
        user = users.findOne({"_id":data["id"]}, {}, {})
        return jsonify(user)
    except Exception as e:
        print("Error: ", e)
        return jsonify(message="Error: User not found")

@app.route("/deleteUser", methods=["GET"])
def delete_user():
    try:
        data = request.get_json()
        user = users.deleteOne({"_id":data["id"]}, {}, {})
        return jsonify(user)
    except Exception as e:
        print("Error: ", e)
        return jsonify(message="Error: User not deleted")

if __name__ == "__main__":
    app.run(debug=True)
