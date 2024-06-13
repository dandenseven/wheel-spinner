from pymongo import MongoClient
import datetime


class Trip:

    trip_ref = ""

    def __init__(self, starting="", destination="", distance=None,
                 weather=None, start_date=int, end_date=int, vehicle_id=None, user_id=None):

        self.starting = starting
        self.destination = destination
        self.distance = distance
        self.weather = weather
        self.start_date = start_date
        self.end_date = end_date
        self.vehicle_id = vehicle_id
        self.user_id = user_id

    def to_json(self):
        return {"starting": self.starting,
                "destination": self.destination,
                "distance": int(self.distance),
                "weather": self.weather,
                "start_date": self.start_date,
                "end_date": self.end_date,
                "vehicle_id": self.vehicle_id,
                "user_id": self.user_id
                }

    def insert(self):
        self.trip_ref.document().set(self.to_json())

    def update(self):
        self.trip_ref.document(self.destination_add).set(self.to_json())

    def delete(self):
        self.trip_ref.document(self.vehicle_id, ).delete(self.to_json())

    @classmethod
    def trips_for_user(cls, user_id):
        trips = cls.trip_ref.where("user_id", "==", user_id).get()
        return [trip.to_dict() for trip in trips]


if __name__ == "__main__":
    pass