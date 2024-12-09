# Define paths to activation scripts
UNIX_ACTIVATE=".venv/bin/activate"
WINDOWS_ACTIVATE=".venv/Scripts/activate"

# Activate the virtual environment
if [ -f $UNIX_ACTIVATE ]; then
    echo "Activating the virtual environment (Unix)..."
    source $UNIX_ACTIVATE
elif [ -f $WINDOWS_ACTIVATE ]; then
    echo "Activating the virtual environment (Windows)..."
    source $WINDOWS_ACTIVATE
else
    echo "Failed to activate the virtual environment. Activation script not found."
    exit 1
fi

# Go to migrations folder
cd migrations


# Check if data file path is provided or not
if [ -z "$1"]; then
    echo "No data file path provided. Please provide the data file path."
    # Take manual input for the data file path
    echo -n "Enter the data file path: "
    read -r filename
    # Run the python script to migrate data
    python ./src/main.py $filename
else
    # Run the python script to migrate data
    echo $1
    python ./src/main.py $1
fi



cd ..

deactivate
