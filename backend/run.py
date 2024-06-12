from routes.app import app
from firebase_admin import credentials, firestore, initialize_app
from models.users import Users
from models.vehicle import Vehicle
from models.trip import Trip


cred = credentials.Certificate('key.json')


default_app = initialize_app(cred)
db = firestore.client()

Users.users_ref = db.collection('users')
Vehicle.vehicle_ref = db.collection('vehicle')
Trip.trip_ref = db.collection('trip')

if __name__ == "__main__":
    app.run()