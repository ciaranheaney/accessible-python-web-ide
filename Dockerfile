FROM python:3.9

RUN apt-get update -y
RUN apt-get install -y libseccomp-dev
RUN apt-get install -y strace

# set a directory for the app
WORKDIR /app

# copy all the files to the container
COPY . .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# define the port number the container should expose
EXPOSE 5000

# run the command
CMD ["python3", "./app.py"]

