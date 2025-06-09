
# Accessible Python Web IDE

This project is a web-based Python IDE (Integrated Development Environment) primarily designed to be accessible for blind and low-vision students learning how to code.

## Basic Instructions (Temporary)

Follow these steps to set up and run the project locally on a Windows machine:

1. Clone the repository:
	```
	git clone https://github.com/ciaranheaney/accessible-python-web-ide.git
	cd accessible-python-web-ide/v2
	```
	- Optionally select which version you would like to use by changing the v2 to your preferred version
	
2. Create and activate a virtual environment:

	1. In PowerShell:
		```
		python3 -m venv myen
		myenv/Scripts/activate
		```
	2. In Git Bash:
		```
		python3 -m venv myenv
		source myenv/Scripts/activate
		```
3. Install Flask in a virtual environment:
	```
	pip install flask
	```
4. Start the development server:
	```
	python3 server.py
	```
	- This command will start both the frontend and backend servers
5. Visit the development server displayed from the previous command


## Project Structure
* `v1/, v2/,...`: Contain each version of the site
* `server.py`: Contains the Python backend code
* `templates/`: Contains the HTML frontend code
* `static/` Contains the CSS and JS frontend code

