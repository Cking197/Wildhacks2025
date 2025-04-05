from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

from bson.objectid import ObjectId
from bson.json_util import dumps
import os

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

# Get User -> Get } MongoDB
# chatgpt & github copilot: "Write and explain boilerplate starter code in Flask to get a user profile stored in MongoDB"
@app.route('/user/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    try:
        # Assuming user_id is a MongoDB ObjectId
        user = collection.find_one({"_id": ObjectId(user_id)})
        if user:
            return dumps(user), 200  # Use bson.json_util.dumps to handle ObjectId
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Create Hobbies -> Post } Gemini API
    # Create Hobby -> Post } MongoDB
# github copilot: "Write and explain code to ping Gemini API to search for and post hobby activities based on user from and to MongoDB"
import requests

@app.route('/hobbies/search', methods=['POST'])
def search_hobbies():
    try:
        # Get user data from the request body
        user_data = request.get_json()
        user_id = user_data.get("user_id")

        # Fetch user profile from MongoDB
        user = collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Prepare request to Gemini API
        gemini_api_url = "https://api.gemini.com/hobbies/search"
        headers = {"Authorization": "Bearer YOUR_GEMINI_API_KEY"}
        payload = {
            "interests": user.get("interests", []),  # Assuming user profile has an 'interests' field
            "location": user.get("location", "unknown")  # Assuming user profile has a 'location' field
        }

        # Send POST request to Gemini API
        response = requests.post(gemini_api_url, json=payload, headers=headers)

        # Handle Gemini API response
        if response.status_code == 200:
            hobbies = response.json()
            return jsonify(hobbies), 200
        else:
            return jsonify({"error": "Failed to fetch hobbies from Gemini API"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/hobbies', methods=['POST'])
def save_hobby():
    try:
        # Get hobby data from the request body
        hobby_data = request.get_json()

        # Save hobby data to MongoDB
        result = collection.insert_one(hobby_data)
        return jsonify({"message": "Hobby saved!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
