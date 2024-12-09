#!/bin/bash

python -m venv .venv
if [ $? -ne 0 ]; then
    echo "Failed to create a virtual environment. Make sure Python is installed."
    exit 1
fi

# Define paths to activation scripts
UNIX_ACTIVATE=".venv/bin/activate"
WINDOWS_ACTIVATE=".venv/Scripts/activate"

# Activate the virtual environment
if [ -f "$UNIX_ACTIVATE" ]; then
    echo "Activating the virtual environment (Unix)..."
    source "$UNIX_ACTIVATE"
elif [ -f "$WINDOWS_ACTIVATE" ]; then
    echo "Activating the virtual environment (Windows)..."
    source "$WINDOWS_ACTIVATE"
else
    echo "Failed to activate the virtual environment. Activation script not found."
    exit 1
fi

# Verify the virtual environment is active
if [ -z "$VIRTUAL_ENV" ]; then
    echo "Virtual environment is not activated. Aborting."
    exit 1
else
    echo "Virtual environment activated: $VIRTUAL_ENV"
fi

# Install libraries from requirements.txt
if [ -f "requirements.txt" ]; then
    echo "Installing libraries from requirements.txt..."
    pip install --no-cache-dir -r requirements.txt
    pip install --no-cache-dir -r ./migrations/requirements.txt
    if [ $? -ne 0 ]; then
        echo "Failed to install the required libraries."
        deactivate
        exit 1
    fi
    echo "Libraries installed successfully."
else
    echo "requirements.txt file not found in root folder (or) ./migrations directory."
fi

# Deactivate the virtual environment
deactivate
echo "Script execution completed."
