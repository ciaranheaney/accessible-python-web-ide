
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
   ```
   chmod +x scripts/run_docker.sh
   ```
3. Build the Docker image and run the Docker container by running the following script:
	```
	./run_docker [image-name] [container-name] [port-number]
 	```
 
	Example usage:
	```
	./run_docker webide-image webide-container 5000
	```
5. Visit `http://[ip-address]:[port-number]` in web browser.<br>
	
 	Example usage: `http://0.0.0.0:5000`
	
#### Follow the following steps to shut down the web app.
1.  Make the `cleanup_docker` script executable by running:
	```
	chmod +x scripts/cleanup_docker.sh
 	```
3. Stop the Docker container and remove the Docker container and image by running the following script:
	```
	./cleanup_docker [image-name] [container-name]
 	```
 
	Example usage:
	```
	./cleanup_docker webide-image webide-container
 	```
	
## Usage Instructions

A basic overview of how to use the application as it was intended to be used for maximum accessibility. This includes various navigation and customization tools, and information about the general layout of the application.

### General Instructions

1. Write Python code in code editor section (Python 3.8.1).
2. Enter inputs in the Input Area if necessary for the specific program.
3. Run the code by pressing the `Run Code` button or using the `Ctrl+R` keyboard shortcut.
4. Press the `Stop Code` button or use the `Ctrl+S` keyboard shortcut to cancel the code execution request.
5. View the output in the Output Area.
6. Customize the web application accessibility and appearance in the side menu (font size, website theme, and code editor theme).
7. Clear the Code Editor, Input Area, and Output Area by pressing their respective `Clear` buttons.

 ### Web App Sections
 
 * **Code Editor**
 * **Input Area**
 * **Output Area**
 * **Side Menu:**
 	* Contains: Accessibility Settings, Help Section

  INSERT IMAGE WITH EACH SECTION OUTLINED AND LABELED

### Keyboard Shortcuts

| Action | Windows/Linux | macOS |
|---|---|---|
| Run Code | <kbd>Ctrl</kbd> + <kbd>R</kbd> | <kbd>Ctrl</kbd> + <kbd>R</kbd> |
| Stop Code Execution | <kbd>Ctrl</kbd> + <kbd>S</kbd> | <kbd>Ctrl</kbd> + <kbd>S</kbd> |
| Escape Code Editor | <kbd>ESC</kbd> + <kbd>ESC</kbd> | <kbd>ESC</kbd> |
| Open Menu | <kbd>Ctrl</kbd> + <kbd>M</kbd> | <kbd>Ctrl</kbd> + <kbd>M</kbd> |
| Close Menu | <kbd>ESC</kbd> | <kbd>ESC</kbd> |

**NOTE:** Additional keyboard shortcuts inherited from Ace Editor found [here](https://github.com/ajaxorg/ace/wiki/default-keyboard-shortcuts).

### Suggested JAWS Navigation

ADD USEFULL JAWS SHORTCUTS

### Accessibility Settings

* Font Size of the code editor, input, and output areas
* Website Theme (Options: Light, Dark, Light Contrast, and Dark Contrast)
* Code Editor Themes (Options provided by Ace Editor)

  INSERT IMAGE OF SIDE MENU WITH OPTIONS

## Project Structure
```
.
├── app
│   ├── app.py
│   ├── static
│   │   ├── ace [54 entries exceeds filelimit, not opening dir]
│   │   ├── script.js
│   │   └── styles.css
│   └── templates
│       └── index.html
├── cleanup_docker.sh
├── Dockerfile
├── README.md
├── requirements.txt
└── run_docker.sh

4 directories, 9 files
```

## Credits

