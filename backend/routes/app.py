import os
from flask import Flask, json, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
from models.vehicle import Vehicle
from models.trip import Trip
from models.users import Users
from flask_cors import CORS
import datetime


app = Flask(__name__)
CORS(app)

# cred = credentials.Certificate('key.json')


# default_app = initialize_app(cred)
# db = firestore.client()
# # todo_ref = db.collection('todos')
# Users.users_ref = db.collection('users')
# Vehicle.vehicle_ref = db.collection('vehicle')
# Trip.trip_ref = db.collection('trip')


# curl localhost:5000/api/login -X POST -H "Content-Type: application/json" -d '{"user_id": 401, "email": "my@email.com", "password": "mustang"}'
# curl localhost:5000/api/login -X POST -H "Content-Type: application/json" -d '{"email": "my@email.com", "password": "mustang"}'

@app.route("/api/login", methods=["POST"])
def login():

    try:

        email = request.json.get("email")
        password = request.json.get("password")
        user_account = Users.login(email, password)
        print(user_account[1].to_dict())

        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/home", methods=["POST"])
def home_login():

    try:
        username = request.json.get("username")
        email = request.json.get("email")
        last_login = request.json.get("last_login")
        add_user = (username, email, last_login)
        user_id = Users.signup(add_user)
        get_newuser = user_id.update()

        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


# create
# curl localhost:8080/add -X POST -H "Content-Type: application/json" -d '{"id": "1", "destination": "NYC", "vehicle": "toyota"}'
# curl localhost:8080/add -X POST -H "Content-Type: application/json" -d '{"id": "1", "username": "1name", "password": "1password",
# "email": "1@email.com", "first_name": "first", "last_name": "last", "home_lat": "40.739320", "home_long": "-73.989360"}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "stringthree", "password": "25password",
# "email": "lwilkes@email.com", "first_name": "Laura", "last_name": "Wilkes", "home_lat": "50.739320", "home_long": "-85.989360", "user_id": 101}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "string99", "password": "99password",
# "email": "mmorris@email.com", "first_name": "Melissa", "last_name": "Morris", "home_lat": "41.739320", "home_long": "-62.989360"}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "string7", "password": "77password",
# "email": "vcitrone@email.com", "first_name": "Val", "last_name": "Citrone", "home_lat": "28.739320", "home_long": "-65.989360", "user_id": 701}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "string6", "password": "68password",
# "email": "saugstine@email.com", "first_name": "Sal", "last_name": "Augustine", "home_lat": "43.739320", "home_long": "-77.989360", "user_id": 601}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "stringfive", "password": "55password",
# "email": "mmoore@email.com", "first_name": "Mark", "last_name": "Moore", "home_lat": "67.739320", "home_long": "-98.989360", "user_id": 501}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "stringone", "password": "2password",
# "email": "2@email.com", "first_name": "Jane", "last_name": "Johnson", "home_lat": "36.739320", "home_long": "-70.989360", "user_id": 201}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "stringtwo", "password": "3password",
# "email": "3@email.com", "first_name": "james", "last_name": "hall", "home_lat": "40.739320", "home_long": "-73.989360","user_id": 303}'

# curl localhost:5000/api/users_add -X POST -H "Content-Type: application/json" -d '{"username": "redone1", "password": "mustang",
# email": "my@email.com", "first_name": "john", "last_name": "doe", "home_lat": "46.739320", "home_long": "-77.989360","user_id": 401}'
# update
# curl localhost:8080/update -X POST -H "Content-Type: application/json" -d '{"id": "1", "title": "new lists"}'


@app.route("/api/users_add", methods=["POST"])
def users_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """

    try:
        username = request.json.get("username")
        email = request.json.get("email")
        first_name = request.json.get("first_name")
        last_name = request.json.get("last_name")
        home_lat = request.json.get("home_lat")
        home_long = request.json.get("home_long")
        user_id = request.json.get("user_id")
        new_users = Users(username, email, first_name,
                          last_name, home_lat, home_long, user_id)
        new_users.insert()

        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


"""Testing
# curl localhost:5000/api/vehicle_add -X POST -H "Content-Type: application/json" -d '{"type": "sedan", "make": "dodge",
# "model": "torch", "total_miles": "40000", "tire_miles": "7000", "tire_purchase_date": "02/28/18", "rotation_miles": "5000", "vehicle_id": "VIN456"}'

# curl localhost:5000/api/vehicle_add -X POST -H "Content-Type: application/json" -d '{"type": "truck", "make": "ford",
# "model": "f150", "total_miles": "35689", "tire_miles": "9000", "tire_purchase_date": "05/22/20", "rotation_miles": "3498", "user_id": 202, "vehicle_id": "VIN679"}'

# curl localhost:5000/api/vehicle_add -X POST -H "Content-Type: application/json" -d '{"type": "sedan", "make": "acura",
# "model": "gts", "total_miles": "20000", "tire_miles": "2000", "tire_purchase_date": "01/28/21", "rotation_miles": "2340","user_id": 203, "vehicle_id": "VIN578"}'

# curl localhost:5000/api/vehicle_add -X POST -H "Content-Type: application/json" -d '{"type": "suv", "make": "lexus",
# "model": "gs500", "total_miles": "52000", "tire_miles": "4590", "tire_purchase_date": "06/23/20", "rotation_miles": "2909","user_id": 204, "vehicle_id": "VIN309"}'

# curl localhost:5000/api/vehicle_add -X POST -H "Content-Type: application/json" -d '{"type": "sedan", "make": "mazda",
# "model": "accord", "total_miles": "56000", "tire_miles": "12000", "tire_purchase_date": "07/21/19", "rotation_miles": "5600","user_id": 205, "vehicle_id": "VIN556"}'

# curl localhost:5000/api/vehicle_add -X POST -H "Content-Type: application/json" -d '{"type": "coupe", "make": "dodge",
# "model": "charger", "total_miles": "40000", "tire_miles": "7700", "tire_purchase_date": "02/05/20", "rotation_miles": "4509","user_id": 206, "vehicle_id": "VIN789"}'

# curl localhost:5000/api/vehicle_add -X POST -H "Content-Type: application/json" -d '{"type": "coupe", "make": "porshe",
# "model": "sp2", "total_miles": "30000", "tire_miles": "3460", "tire_purchase_date": "09/15/20", "rotation_miles": "6980","user_id": 207, "vehicle_id": "VIN535"}'
"""


@app.route("/api/vehicle_add", methods=["POST"])
def vehicle_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """

    make = request.json.get("make")
    model = request.json.get("model")
    vehicle_miles = request.json.get("vehicle_miles")
    tire_miles = request.json.get("tire_miles")
    tire_purchase_date = request.json.get("tire_purchase_date")
    rotation_miles = request.json.get("rotation_miles")
    warranty_miles = request.json.get("warranty_miles")
    color = request.json.get("color")
    user_id = request.json.get("user_id")
    vehicle_id = request.json.get("vehicle_id")

    if user_id:
        new_vehicle = Vehicle(make, model, vehicle_miles, tire_miles,
                              tire_purchase_date, rotation_miles, warranty_miles, color, user_id, vehicle_id)
        new_vehicle.insert()

        return jsonify({"success": True}), 200

    return f"An Error Occured"


# curl localhost:5000/api/trip_add -X POST -H "Content-Type: application/json" -d '{"destination_add": "Orlando, Florida", "start_add": "Amityville, NY",
# "distance": "876 miles", "weather": "70 degrees", "vehicle_id": "1redtoyota", "user_id": 301}'

# curl localhost:5000/api/trip_add -X POST -H "Content-Type: application/json" -d '{"destination_add": "San Diego, CA", "start_add": "Nashville, TN",
# "distance": "1209 miles", "weather": "80 degrees", "vehicle_id": "3489", "user_id": 302}'

# curl localhost:5000/api/trip_add -X POST -H "Content-Type: application/json" -d '{"destination_add": "Brooklyn, NY", "start_add": "Atlanta, GA",
# "distance": "987 miles", "weather": "67 degrees", "vehicle_id": "1209", "user_id": 303}'

# curl localhost:5000/api/trip_add -X POST -H "Content-Type: application/json" -d '{"destination_add": "New York, NY", "start_add": "Scranton, PA",
# "distance": "340 miles", "weather": "48 degrees", "vehicle_id": "9384", "user_id": 304}'

# curl localhost:5000/api/trip_add -X POST -H "Content-Type: application/json" -d '{"destination_add": "Baltimore, MD", "start_add": "Hoboken, NJ",
# "distance": "270 miles", "weather": "42 degrees", "vehicle_id": "5678", "user_id": 305}'

# curl localhost:5000/api/trip_add -X POST -H "Content-Type: application/json" -d '{"destination_add": "Massapequa, NY", "start_add": "Brooklyn, NY",
# "distance": "35 miles", "weather": "45 degrees", "vehicle_id": "9786", "user_id": 306}'

# curl localhost:5000/api/trip_add -X POST -H "Content-Type: application/json" -d '{"destination_add": "Poconos, PA", "start_add": "New York, NY",
# "distance": "740 miles", "weather": "57 degrees", "vehicle_id": "9899", "user_id": 307}'


@app.route("/api/users_home", methods=["POST", "PUT"])
def home_page():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """

    data = request.get_json()
    print(data)
    user_id = request.json.get("user_id")
    user = Users.users_for_user(user_id).to_dict()
    print(user)
    current_user = Users(user_id=user_id, last_login=user.get("last_login"))

    output = current_user.user_status()
    print(output)
    print(user_id)
    if user_id:
        return jsonify(output), 200
    else:

        return jsonify({"vehicles": [], "trips": []})
    # except Exception as e:
    #     return f"An Error Occured: {e}"
    # return jsonify({"vehicles": []})


@app.route("/api/trip_add", methods=["POST"])
def trip_create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """

    starting = request.json.get("starting")
    destination = request.json.get("destination")
    distance = request.json.get("distance")
    weather = request.json.get("weather")
    start_date = request.json.get("start_date")
    end_date = request.json.get("end_date")
    vehicle_id = request.json.get("vehicle_id")
    user_id = request.json.get("user_id")
    if user_id:
        new_trip = Trip(starting, destination, distance,
                        weather, start_date, end_date, vehicle_id, user_id)
        new_trip.insert()

        return jsonify({"success": True}), 200

    else:
        return f"An Error Occured"


@app.route("/api/read_users", methods=['GET'])
def users_read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    try:
        # Check if ID was passed to URL query

        user_id = request.json.get(["user_id"])
        if user_id:

            users = Users.users_for_user(user_id)
            print(users)
            return jsonify(users.to_dict()), 200

        else:

            return
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/users_vehicle", methods=["POST", "PUT"])
def vehicle_read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """
    # try:

    data = request.get_json()
    print(data)
    user_id = request.json.get("user_id")

    print(user_id)
    if user_id:

        vehicles = Vehicle.vehicles_for_user(user_id)
        print(vehicles)
        return jsonify(vehicles), 200

    else:

        return jsonify({"vehicles": []})


@app.route("/api/users_trip", methods=["POST", "PUT"])
def trip_read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        todo : Return document that matches query ID.
        all_todos : Return all documents.
    """

    data = request.get_json()
    print(data)
    user_id = request.json.get("user_id")
    print(user_id)
    if user_id:
        trips = Trip.trips_for_user(user_id)
        print(trips)

        return jsonify(trips), 200

    else:

        return jsonify({"trips": []})


# update
# curl localhost:8080/update -X POST -H "Content-Type: application/json" -d '{"id": "1", "title": "new lists"}'
# update
# curl localhost:5000/api/update_users -X POST -H "Content-Type: application/json" -d '{"email": "mmynew@email.com"}'

# @app.route("/api/users_weather", methods=["GET"])
# def weather_read():
#     try:

#         user_id = request.json.get("user_id")
#         return jsonify({"success": True}), 200
#         pass
#     except Exception as e:
#         return f"An Error Occured: {e}"


@app.route("/api/update_tire_miles", methods=['POST', 'PUT'])
def tire_mileage():

    data = request.get_json()
    print(data)
    user_id = request.json.get("user_id")
    user = Users.users_for_user(user_id).to_dict()
    print(user)
    current_user = Users(user_id=user_id, last_login=user.get("last_login"))

    output = current_user.tire_status()
    print(output)
    print(user_id)
    if user_id:

        return jsonify(output), 200

    else:

        return jsonify({"vehicles": [], "trips": []})


@app.route("/api/update_rotation_miles", methods=['POST', 'PUT'])
def rotation_mileage():

    data = request.get_json()
    print(data)
    user_id = request.json.get("user_id")
    user = Users.users_for_user(user_id).to_dict()
    print(user)
    current_user = Users(user_id=user_id, last_login=user.get("last_login"))

    output = current_user.tire_rotation_status()
    print(output)
    print(user_id)
    if user_id:

        return jsonify(output), 200

    else:

        return jsonify({"vehicles": [], "trips": []})


@app.route("/api/update_users", methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:

        email = request.json.get("email")
        users_update = Users(email)
        users_update.update()

        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/update_vehicle", methods=['POST', 'PUT'])
def vehicle_update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """

    try:
        id = request.json['id']
        vehicle_update = Vehicle(vehicle_id=id)
        vehicle_update.reset_tires()

        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/update_rotation", methods=['POST', 'PUT'])
def vehicle_rotation():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """

    try:
        id = request.json['id']
        vehicle_update = Vehicle(vehicle_id=id)
        vehicle_update.reset_rotation_tires()
        # todo_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/update_trip", methods=['POST', 'PUT'])
def trip_update(id):
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """

    try:
        id = request.json['id']
        trip_update = Trip()
        trip_update.update()

        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/delete_users", methods=['GET', 'DELETE'])
def delete(id):
    """
        delete() : Delete a document from Firestore collection.
    """

    try:
        # Check for ID in URL query
        # todo_id = request.args.get('id')
        # todo_ref.document(id).delete()
        users_delete = Users()
        users_delete.delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/delete_vehicle/<id>", methods=['GET', 'DELETE'])
def vehicle_delete(id):
    """
        delete() : Delete a document from Firestore collection.
    """

    try:

        # Check for ID in URL query
        # todo_id = request.args.get('id')
        # todo_ref.document(id).delete()
        vehicle_delete = Vehicle()
        vehicle_delete.delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route("/api/delete_trip/<id>", methods=['GET', 'DELETE'])
def trip_delete(id):
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        # todo_id = request.args.get('id')
        # todo_ref.document(id).delete()
        trip_delete = Trip()
        trip_delete.delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


# create
# curl localhost:8080/add -X POST -H "Content-Type: application/json" -d '{"id": "1", "destination": "NYC", "vehicle": "toyota"}'
# update
# curl localhost:8080/update -X POST -H "Content-Type: application/json" -d '{"id": "1", "title": "new lists"}'
# delete
# curl localhost:8080/delete/2
# read

# port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port="port")