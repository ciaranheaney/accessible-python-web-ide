FROM python:3.9

# Set a directory for the app
WORKDIR /app

# Copy all the files to the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Define the port number the container should expose
EXPOSE 5000

# Run the command
CMD ["python3", "./app/app.py"]