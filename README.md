
# Accessible Python Web IDE

This project is a web-based Python IDE (Integrated Development Environment) primarily designed to be accessible for blind and low-vision students learning how to code utilizing the JAWS screenreader on Windows machines.

## Installation Steps

Ensure the following dependencies are installed prior to deploying the web app.
1. Install Docker on host machine (Add more ... ) 
2. Clone this repository:
	```
	git clone https://github.com/ciaranheaney/accessible-python-web-ide.git
	```
	
## Web App Deployment

#### Follow the following steps to deploy the web app.
1. Make the `run_docker` script executable by running:
	`chmod +x scripts/run_docker.sh`
3. Build the Docker image and run the Docker container by running the following script:
	`./run_docker [image-name] [container-name] [port-number]`
	Example:
	`./run_docker webide-image webide-container 5000`
4. Visit `http://[ip-address]:[port-number]` in web browser
	Example: 
	`http://0.0.0.0:5000`
	
#### Follow the following steps to shut down the web app.
1.  Make the `cleanup_docker` script executable by running:
	`chmod +x scripts/cleanup_docker.sh`
2. Stop the Docker container and remove the Docker container and image by running the following script:
	`./cleanup_docker [image-name] [container-name]`
	Example:
	`./cleanup_docker webide-image webide-container`
	
## Usage Instructions



## Project Structure
```
.
├── app
│ 	├── app.py
│ 	├── static
│   │   ├── ace [54 entries exceeds filelimit, not opening dir]
│   │   ├── script.js
│   │   └── styles.css
│   └── templates
│   └── index.html
├── Dockerfile
├── README.md
└── requirements.txt
```

## Credits

