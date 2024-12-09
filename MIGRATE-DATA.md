## How to migrate data to the mongodb database

Sometimes uploading some data to database is hard, so I have tried to simplify it here.

To make data migration to the database eaier, we have created a `Python` module / script to connect to mongodb and push the data to the database.

The code is written in `/migrations` which one can refer to for more information on how it is done. It has a descriptive [README](https://github.com/TheShiveshNetwork/kernel-panic/blob/main/migrations/README.md) too, so RTFM.

To make my life easier and not remember and type the command again and again, I have created a simple shell script to execute the command for me.

## Pre setup

Make sure to run the PREMIGRATE script to setup the environment before trying to push your changes to the db.

```sh
./PREMIGRATE.sh
```

This command will simply create a virtual environment and install all the requirements for the task.

## Setup

First create the file `config/config.py` inside `migrations/src` folder with your mongodb connection string and database name as mentioned in the `config/config.example.py` file:

```py
MONGODB_URL=
DB_NAME=
```

For more info, refer [migrate setup](https://github.com/TheShiveshNetwork/kernel-panic/blob/main/migrations/README.md#migrate-script)

- Data file format

Our module is defined for a specific json data format, make sure to follow this:

```json
{
    "name": "", // correct name of the collection to push the data into
    "data": [], // array of the data to be pushed (array of objects)
}
```

NOTE: The module gets the name from the json object and this name will become the collection name in mongodb database

## Run Script

```sh
./MIGRATE.sh
```

OR

```sh
./MIGRATE.sh "<PATH_TO_DATA_FILE>"
```

It'll ask the file path to input
Pass the correct file path

Boom! Magic!!

No magic, Read The F***ing CODE.
