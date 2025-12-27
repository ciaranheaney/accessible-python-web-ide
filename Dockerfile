FROM python:3.9-slim

# Set a directory for the app
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the files to the container
COPY . .

# Define the port number the container should expose
EXPOSE 5000

# Run the command
CMD ["python3", "app/app.py"]