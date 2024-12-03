from pymongo import MongoClient

class MongoDBClient:
    def __init__(self, host: str, port: int, db_name: str):
        self.host = host
        self.port = port
        self.db_name = db_name

    def connect(self):
        print(f"Connecting to MongoDB...")
        client = MongoClient(self.host, self.port)
        self.db = client[self.db_name]
        if self.db:
            print(f"Connected to MongoDB at {self.host}:{self.port}")
