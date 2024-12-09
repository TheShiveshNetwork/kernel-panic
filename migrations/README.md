## Steps to setup

1. create virtual environment
```bash
python -m venv .venv
```

2. activate the environment and install the required pakages
```bash
# On windows
.venv/Scripts/activate

# On linux / mac
source .venv/bin/activate.bat
```
```bash
pip install -r requirements.txt
```

## Migrate Script

First create the file `config/config.py` inside src folder with your mongodb connection string and database name as mentioned in the `config/config.example.py` file:

```py
MONGODB_URL=
DB_NAME=
```

Once the config file is setup, make sure the virtual environment is activated and run the below command

```sh
python ./src/main.py <PATH_TO_FILE>
```

NOTE: Currently `PATH_TO_FILE` only supports absolute path, do not give relative path.

## Data file format

```json
{
    "name": "", // correct name of the collection to push the data into
    "data": [], // array of the data to be pushed (array of objects)
}
```
