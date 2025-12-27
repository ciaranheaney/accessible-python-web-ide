
# Accessible Python Web IDE

This project is a web-based Python IDE (Integrated Development Environment) primarily designed to be accessible for blind and low-vision students learning how to code utilizing the JAWS screenreader on Windows machines.

## Installation Steps

Ensure the following dependencies are installed prior to deploying the web app.
1. **Install Docker Engine (required)**. 
   This application runs inside a Docker container, so Docker must be installed before continuing.

   Follow the official Docker installation instructions for your operating system at the link below, and complete all steps listed on that page:
   - Windows: https://docs.docker.com/desktop/setup/install/windows-install/
   - Mac: https://docs.docker.com/desktop/setup/install/mac-install/
   - Linux: https://docs.docker.com/engine/install/
  
3. Clone this repository in desired location on host machine:

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

### Suggested JAWS Navigation Hotkeys

| Action | JAWS Shortcut |
|---|---|
| Next Heading | <kbd>H</kbd> |
| List Headings | <kbd>Insert</kbd> + <kbd>F6</kbd> |
| Next Button | <kbd>B</kbd> |
| Prior Button | <kbd>Shift</kbd> + <kbd>B</kbd> |
| List Buttons on Screen | <kbd>Ctrl</kbd> + <kbd>Insert</kbd> + <kbd>B</kbd> |
| Next Paragraph | <kbd>P</kbd> |
| List Paragraphs on Screen | <kbd>Ctrl</kbd> + <kbd>Insert</kbd> + <kbd>P</kbd> |
| Say Line | <kbd>INSERT</kbd> + <kbd>UP ARROW</kbd> |
| Say Prior Line | <kbd>UP ARROW</kbd> |
| Say Next Line | <kbd>DOWN ARROW</kbd> |

**NOTE:** All JAWS Hotkeys can be found [here](https://www.freedomscientific.com/training/jaws/hotkeys/).

### Accessibility Settings

* **Font Size** of the code editor, input, and output areas
* **Website Theme** (Options: Light, Dark, Light Contrast, and Dark Contrast)
* **Code Editor Themes** (Options provided by Ace Editor)

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

This project was completed as part of ongoing efforts to make computer science education more inclusive and was made possible thanks to the support and guidance of the faculty and resources within the University of Notre Dame’s Computer Science and Engineering Department.

<pre>
<strong>Project Author:</strong>
  Ciaran Heaney
  Computer Science
  University of Notre Dame
</pre>

<pre>
<strong>Faculty Advisor:</strong>
  Professor Collin McMillan
  Computer Science and Engineering Department
  University of Notre Dame
</pre>
