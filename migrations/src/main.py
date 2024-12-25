import sys
import json
from config.config import MONGODB_URL, DB_NAME
from db.mongodb import AtlasClient

from art import tprint
from termcolor import cprint

def main():
    if len(sys.argv) != 2:
        print("Usage: python main.py <json_file_path>")
        sys.exit(1)

    json_file_path = sys.argv[1]
    print(f"Reading data from {json_file_path}")

    client = AtlasClient(MONGODB_URL, DB_NAME)

    with open(json_file_path, encoding="utf-8") as f:
        data = json.load(f)
        # for single_data in data["data"]:
        #     print(single_data)
        collection_name = data["name"]
        cprint(f"\nMigrating data to {collection_name}: \n", "blue")
        try:
            client.insert_many(collection_name, data["data"])
        except Exception as e:
            cprint(f"\nError while migrating data to {collection_name}: {e}\n", "red")
        finally:
            cprint(f"\nData migrated to {collection_name} successfully\n", "green")


if __name__ == "__main__":
    tprint("Panic Migrate")
    main()
