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

# Go to migrations folder
cd migrations

python ./src/main.py
