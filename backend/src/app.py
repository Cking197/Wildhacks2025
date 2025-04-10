from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import ObjectId
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel
import os


app = Flask(__name__)
CORS(app)

load_dotenv()
uri = os.getenv("MONGODB_URI")

# Create a new client and connect to the server
mongoClient = MongoClient(uri, server_api=ServerApi('1'))
geminiClient = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


#Hobby Proposal
class HobbyProposal(BaseModel):
    activity: str
    description: str
    time: str
    budget: str

#Hobby Proposal
class HobbyTask(BaseModel):
    task: str


# Send a ping to confirm a successful connection
try:
    mongoClient.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = mongoClient["mydatabase"]
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
        user_id = ObjectId(data["_id"]["$oid"])  # assuming frontend sends _id as a string
        update_fields = {
            "name": data["name"],
            "pastHobbies": data["pastHobbies"],
            "activeHobbies": data["activeHobbies"],
            "location": data["location"],
            "availability": data["availability"],
            "budget": data["budget"],
            "age": data["age"]
        }
        users.update_one({"_id": user_id}, {"$set": update_fields})
        return jsonify(message="User updated!")
    except Exception as e:
        print("Error: ", e)
        return jsonify(message="Error: User not updated"), 500

@app.route("/getUser", methods=["POST"])
def get_user():
    try:
        data = request.get_json()
        user_id = ObjectId(data["_id"]["$oid"])  # assuming frontend sends _id as a string
        user = users.find_one({"_id": user_id})
        if user:
            user["_id"] = str(user["_id"])  # convert ObjectId to string for JSON
            return jsonify(user)
        else:
            return jsonify(message="User not found"), 404
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Error: User not found"), 500

@app.route("/deleteUser", methods=["DELETE"])
def delete_user():
    try:
        data = request.get_json()
        user_id = ObjectId(data["_id"]["$oid"])
        result = users.delete_one({"_id": user_id})
        if result.deleted_count == 1:
            return jsonify(message="User deleted!")
        else:
            return jsonify(message="User not found"), 404
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Error: User not deleted"), 500

@app.route("/createHobbies", methods=["POST"])
def create_Hobbies():
    try:
        user = get_user() 
        data=user.get_json() 

        hobbies = ', '.join([obj["activity"] for obj in data["pastHobbies"]])
        
        prompt = f"""As someone who has previously spent time {hobbies}, please give me a JSON formatted list of 3 related or similar hobbies that work for
            someone who is {data["age"]} years old, lives in a {data["location"]} area, is willing to spend ${data["budget"]}, and is willing
            to invest {data["availability"]} hours per week on these hobbies. Please include only an "activity," "description," "time," (per unit of relevant 
            time) and "budget" (per relevant unit) field. Please do not add additional notes for "time" and "budget."
        """

        response = geminiClient.models.generate_content(
            model="gemini-2.0-flash", 
            contents=prompt, 
            config={
                'response_mime_type': 'application/json',
                'response_schema': list[HobbyProposal],
            },)
        return response.text
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Error: Unable to create hobbies"), 500
    
@app.route("/createTasks", methods=["POST"])
def create_Tasks():
    try:
        data = request.get_json()
        hobbyProposal = data["hobby"]
        
        prompt = f"""I'm really interested in {hobbyProposal["activity"]}, with the following description: {hobbyProposal["description"]}, but have no idea where to start. Please create a JSON formatted list of at least
            3 tasks to help me figure out where or how to start. Please include only a "tasks" field.
        """

        response = geminiClient.models.generate_content(
            model="gemini-2.0-flash", 
            contents=prompt, 
            config={
                'response_mime_type': 'application/json',
                'response_schema': list[HobbyTask],
            },)
        

        """TODO: Add activity type (physical, intellectual, etc...)"""
        # print(response.parsed, "\n\n")
        tasks = [{"task":obj.task, "completed":False} for obj in response.parsed]

        hobby = {
            "activity": data["hobby"]["activity"],
            "experience": "Started",
            "cost": data["hobby"]["budget"],
            "time": data["hobby"]["time"],
            "active": True,
            "tasks": tasks
        }

        user = get_user() 
        data=user.get_json()
        data["_id"] = {"$oid": data["_id"]}

        # print("before: ", data["activeHobbies"])
        data["activeHobbies"].append(hobby)
        # print("after: ", data["activeHobbies"])

        with app.test_client() as client:
            new_body = data
            
            response = client.post('/updateUser', json=new_body)

            return response.get_json()  # or response.get_json()
        
    except Exception as e:
        print("Error:", e)
        return jsonify(message="Error: Unable to create tasks"), 500


if __name__ == "__main__":
    app.run(debug=True)
