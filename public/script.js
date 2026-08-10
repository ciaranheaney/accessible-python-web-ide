
// Scripts for setting up Ace editor
ace.config.set("basePath", "/ace");
var editor = ace.edit("editor");
editor.setTheme("ace/theme/textmate");
editor.session.setMode("ace/mode/python");

const default_code = `
# Python Web IDE - Accessibility settings in menu

# Write code here...

`

editor.setValue(default_code, -1);

editor.setOptions({
    enableBasicAutocompletion: false,
    enableInlineAutocompletion: false,
    enableSnippets: false,
    enableLiveAutocompletion: false
});

// Side menu HTML code
menu_code = `<aside class="light-menu menu" id="menu" aria-label="menu">
        <div>
            <div class="menu-top-btns">
                <button class="light-close-menu-btn close-menu-btn" id="close-menu-btn" onclick="hide_menu()" aria-label="hide menu">
                    <label for="close-menu-btn">Hide</label>
                    <i class="fas fa-times" style="font-size: 32px;"></i>
                </button>
                <button class="light-reset-btn reset-btn" id="reset-btn" onclick="reset_settings()" aria-label="reset settings">
                    <label for="reset-btn">Reset</label>
                    <i class="fas fa-redo" style="font-size: 32px;"></i>
                </button>
            </div>
        </div>
        <section class="settings-container">
            <div style="display: flex; gap: 12px; justify-content: center; align-items: center; margin-bottom: -12px;">
                <i class="fas fa-cog" style="font-size: 2rem;"></i>
                <h2 class="menu-header" id="menu-header-title" aria-label="accessibility settings"><u>Settings</u></h2>
            </div>
            <div class="font-input-container" aria-label="font input">
                <div>
                    <label for="font-input" class="label">Font Size</label>
                    <input type="range" class="light-font-input font-input" id="font-input" value="20" min="12" max="48" step="2" oninput="change_font_size(this.value)">
                </div>
                <output class="font-output" id="font-size-output">20</output>
            </div>

            <fieldset>
                <legend>
                    <label for="page-theme"  class="label">Website Theme</label>
                </legend>
                <div class="page-theme" id="page-theme">
                    <label class="theme-option" for="light-theme">Light
                        <input type="radio" id="light-theme" name="theme" value="Light" onclick="set_theme('light')" checked="checked">
                        <span class="light-checkmark checkmark"></span>
                    </label>
                    <label class="theme-option" for="light-contrast-theme">Light Contrast
                        <input type="radio" id="light-contrast-theme" name="theme" value="Light Contrast" onclick="set_theme('light-contrast')">
                        <span class="light-contrast-checkmark checkmark"></span>
                    </label>
                    <label class="theme-option" for="dark-theme">Dark
                        <input type="radio" id="dark-theme" name="theme" value="Dark" onclick="set_theme('dark')">
                        <span class="light-checkmark checkmark"></span>
                    </label>
                    <label class="theme-option" for="dark-contrast-theme">Dark Contrast
                        <input type="radio" id="dark-contrast-theme" name="theme" value="Dark Contrast" onclick="set_theme('dark-contrast')">
                        <span class="dark-contrast-checkmark checkmark"></span>
                    </label>
                </div>
            </fieldset>
            

            <div class="editor-theme" aria-label="editor theme">
                <label for="editor-theme" class="label">Editor Theme</label>
                <select name="editor-theme" id="editor-theme" class="editor-theme-select" onchange="change_editor_theme(this.value)">
                    <optgroup label="Light Themes">
                        <option value="chrome">Chrome</option>
                        <option value="cloud_editor">Cloud Editor</option>
                        <option value="cloud9_day">Cloud9 Day</option>
                        <option value="clouds">Clouds</option>
                        <option value="crimson_editor">Crimson Editor</option>
                        <option value="dawn">Dawn</option>
                        <option value="dreamweaver">Dreamweaver</option>
                        <option value="eclipse">Eclipse</option>
                        <option value="github_light_default">GitHub Light Default</option>
                        <option value="github">GitHub</option>
                        <option value="gruvbox_light_hard">Gruvbox Light Hard</option>
                        <option value="iplastic">IPlastic</option>
                        <option value="katzenmilch">KatzenMilch</option>
                        <option value="kuroir">Kuroir</option>
                        <option value="solarized_light">Solarized Light</option>
                        <option value="sqlserver">SQL Server</option>
                        <option value="textmate" selected="selected">Textmate</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="xcode">XCode</option>
                    </optgroup>
                    <optgroup label="Dark Themes">
                        <option value="ambiance">Ambiance</option>
                        <option value="chaos">Chaos</option>
                        <option value="cloud_editor_dark">Cloud Editor Dark</option>
                        <option value="cloud9_night_low_color">Cloud9 Night Low Color</option>
                        <option value="cloud9_night">Cloud9 Night</option>
                        <option value="clouds_midnight">Clouds Midnight</option>
                        <option value="cobalt">Cobalt</option>
                        <option value="dracula">Dracula</option>
                        <option value="github_dark">GitHub Dark</option>
                        <option value="gob">Green on Black</option>
                        <option value="gruvbox_dark_hard">Gruvbox Dark Hard</option>
                        <option value="gruvbox">Gruvbox</option>
                        <option value="idle_fingers">idle Fingers</option>
                        <option value="kr_theme">krTheme</option>
                        <option value="merbivore_soft">Merbivore Soft</option>
                        <option value="merbivore">Merbivore</option>
                        <option value="mono_industrial">Mono Industrial</option>
                        <option value="monokai">Monokai</option>
                        <option value="nord_dark">Nord Dark</option>
                        <option value="one_dark">One Dark</option>
                        <option value="pastel_on_dark">Pastel on Dark</option>
                        <option value="solarized_dark">Solarized Dark</option>
                        <option value="terminal">Terminal</option>
                        <option value="tomorrow_night_blue">Tomorrow Night Blue</option>
                        <option value="tomorrow_night_bright">Tomorrow Night Bright</option>
                        <option value="tomorrow_night_eighties">Tomorrow Night Eighties</option>
                        <option value="tomorrow_night">Tomorrow Night</option>
                        <option value="twilight">Twilight</option>
                        <option value="vibrant_ink">Vibrant Ink</option>
                    </optgroup>
                </select>
            </div>
        </section>
        <section aria-label="help section" class="help-section">
            <h2 class="menu-header help-section-header" id="help-header">
                <i class="fas fa-info-circle" style="font-size: 2rem;"></i>
                <u>Help Section</u>
            </h2>
            <ul>
                <li class="help-li">Write Python code in code editor</li>
                <li class="help-li">Press [ESC] while in code editor to exit</li>
                <li class="help-li">Enter inputs in input area if program requires user input</li>
                <li class="help-li">Click "Run Code" button to compile and execute code</li>
                <li class="help-li">Click "Stop Code" button to cancel code execution</li>
                <li class="help-li">View program output in output area</li>
            </ul>
        </section>

    </aside>`;

// Buttons
const menu_button = document.getElementById('menu-btn');
const hide_menu_button = document.getElementById('close-menu-btn');
const control_button = document.getElementById('control-btn')
const run_button = document.getElementById('run-btn');
const run_button_icon = document.getElementById('run-btn-icon');
const run_button_label = document.getElementById('run-btn-lbl');
const clear_code_button = document.getElementById('clear-code-btn');
const clear_input_button = document.getElementById('clear-input-btn');
const clear_output_button = document.getElementById('clear-output-btn');
const reset_button = document.getElementById('reset-btn');
const font_input = document.getElementById('font-input');
const editor_theme_input = document.getElementById('editor-theme');

// Areas
const body = document.querySelector('body');
const banner = document.getElementById('banner');
const menu = document.getElementById('menu');
const editor_container = document.getElementById('editor-container');
const editor_header = document.getElementById('editor-header');
const code_container = document.getElementById('code-container');
const editor_area = document.getElementById('editor');
const editor_input = document.querySelector('.ace_text-input');
const ace_scrollbar = document.querySelector('.ace_scrollbar');
const input_container = document.getElementById('input-container');
const input_header = document.getElementById('input-header');
const input_area = document.getElementById('input-area');
const output_container = document.getElementById('output-container');
const output_header = document.getElementById('output-header');
const output_area = document.getElementById('output-area');
const font_size_output = document.getElementById('font-size-output');
const overlay = document.getElementById('overlay');


// Themes
const light_themes = [
    "chrome", "cloud_editor", "cloud9_day", "clouds", "crimson_editor", 
    "dawn", "dreamweaver", "eclipse", "github_light_default", "github",
    "gruvbox_light_hard", "iplastic", "katzenmilch", "kuroir", 
    "solarized_light", "sqlserver", "textmate", "tomorrow", "xcode"
]
const dark_themes = [
    "ambiance", "chaos", "cloud_editor_dark", "cloud9_night_low_color",
    "cloud9_night", "clouds_midnight", "cobalt", "dracula", "github_dark",
    "gob", "gruvbox_dark_hard", "gruvbox", "idle_fingers", "kr_theme",
    "merbivore_soft", "merbivore", "mono_industrial", "monokai", "nord_dark",
    "one_dark", "pastel_on_dark", "solarized_dark", "terminal", "tomorrow_night_blue",
    "tomorrow_night_bright", "tomorrow_night_eighties", "tomorrow_night", 
    "twilight", "vibrant_ink"
]

// Global abort request controller
let controller;

function run_code() {
    // Clear output area
    output_area.value = "";

    // Get code and inputs
    console.log("[RUN] button pressed...");
    const code = editor.getValue();
    const input = input_area.value;

    // Check if code is empty -> Don't run if empty
    if (!code.trim()) {
        console.log("[ERROR] Cannot run empty code...");
        output_area.value = "ERROR: Cannot run empty code...";
        return
    }

    console.log("[SENDING] code to server...")

    if (input.trim()) {
        console.log("[SENDING] input to server...")
    }

    // Create a new abort signal for each request
    controller = new AbortController();

    // Change run button to stop button
    control_button.innerHTML = '<button class="btn stop-btn" id="stop-btn" onclick="stop_code()" aria-controls="output-area"><i class="fas fa-stop" id="stop-btn-icon"></i><label for="stop-btn" id="stop-btn-lbl">Stop Code</label></button>';

    // Send code and inputs to backend and handle response
    fetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            "input": input,
            "code": code
         }),
         signal: controller.signal
    })
        .then(response => response.json())
        .then(data => {
            console.log("[RECIEVED] data from server...")
            console.log(data)
            const output = data.stdout || data.stderr || data.compile_output || data.message || "";
            output_area.value = output;
            console.log(`[OUTPUT]:\n${output}`);
            control_button.innerHTML = '<button class="btn run-btn" id="run-btn" onclick="run_code()" aria-controls="output-area"><i class="fas fa-play" id="run-btn-icon"></i><label for="run-btn" id="run-btn-lbl">Run Code</label></button>';
            output_area.scroll(0, output_area.scrollHeight);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
            } else {
                console.log(`[ERROR]: ${err}`);
                output_area.value = `ERROR: ${err.message || err}`;
                control_button.innerHTML = '<button class="btn run-btn" id="run-btn" onclick="run_code()" aria-controls="output-area"><i class="fas fa-play" id="run-btn-icon"></i><label for="run-btn" id="run-btn-lbl">Run Code</label></button>';
            }
            output_area.scroll(0, output_area.scrollHeight);
        })
    output_area.focus();
}


function stop_code() {
    console.log("[ABORTING] code execution...");
    output_area.value = '** Process Stopped **';
    controller.abort();
    control_button.innerHTML = '<button class="btn run-btn" id="run-btn" onclick="run_code()" aria-controls="output-area"><i class="fas fa-play" id="run-btn-icon"></i><label for="run-btn" id="run-btn-lbl">Run Code</label></button>';
}



function clear_code() {
    if(confirm("\n**WARNING**\n\nThis action will delete your code and make it unrecoverable.\nAre you sure you want to clear the code window?")) {
        console.log("[CLEAR] code editor...")
        editor.setValue("");
        editor.focus();
    }
}

function clear_output() {
    console.log("[CLEAR] output...")
    output_area.value = "";
}

function clear_input() {
    console.log("[CLEAR] input...")
    input_area.value = "";
    input_area.focus();
}

function show_menu() {
    console.log("[OPEN] side menu...");

    document.getElementById('menu-wrapper').style.display = 'block';
    overlay.style.display = 'block';
    document.getElementById('menu-wrapper').innerHTML = menu_code;
    const menu = document.getElementById('menu');
    void menu.offsetWidth;
    menu.classList.add('open');

    document.getElementById('menu-btn').tabIndex = '-1';
    document.getElementById('run-btn').tabIndex = '-1';
    document.getElementById('clear-code-btn').tabIndex = '-1';
    document.getElementById('clear-input-btn').tabIndex = '-1';
    document.getElementById('clear-output-btn').tabIndex = '-1';
    document.getElementById('input-header').tabIndex = '-1';
    document.getElementById('input-area').tabIndex = '-1';
    document.getElementById('output-area').tabIndex = '-1';
    document.querySelector('.ace_text-input').tabIndex = '-1';
    document.querySelector('.ace_scrollbar').tabIndex = '-1';

    document.getElementById('close-menu-btn').focus();
}


function hide_menu() {
    console.log("[CLOSE] side menu...");

    const menu = document.getElementById('menu');
    menu.classList.remove('open');
    menu.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'right') {
            document.getElementById('menu-wrapper').style.display = 'none';
            document.getElementById('menu-wrapper').innerHTML = '';
            overlay.style.display = 'none';
        }
    });

    document.getElementById('menu-btn').tabIndex = '0';
    document.getElementById('run-btn').tabIndex = '0';
    document.getElementById('clear-code-btn').tabIndex = '0';
    document.getElementById('clear-input-btn').tabIndex = '0';
    document.getElementById('clear-output-btn').tabIndex = '0';
    document.getElementById('input-area').tabIndex = '0';
    document.getElementById('output-area').tabIndex = '0';
    document.querySelector('.ace_text-input').tabIndex = '0';
    document.querySelector('.ace_scrollbar').tabIndex = '0';

    document.getElementById('menu-btn').focus();
}


// Exit menu if user clicks off of the menu
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    if (!menu || event.pointerType !== 'mouse') return;
    if (menu.classList.contains('open')) {
        var mouseClickWidth = event.clientX;
        if (window.innerWidth - mouseClickWidth >= menu.offsetWidth){
            hide_menu();
        }
    }
})


function change_font_size(font_size) {
    console.log(`[CHANGE] font size to ${font_size}px...`)
    editor_area.style.fontSize = `${font_size}px`;
    input_area.style.fontSize = `${font_size}px`;
    output_area.style.fontSize = `${font_size}px`;

    document.getElementById('font-size-output').value = font_size;
}


function change_editor_theme(theme) {
    console.log(`[SET] editor theme to ${theme}...`)
    editor.setTheme('ace/theme/' + theme);
    document.getElementById('editor-theme').value = theme;
}

function reset_settings() {
    console.log("[RESET] to default settings...")
    change_font_size(20);
    editor.setTheme('ace/theme/textmate');
    document.getElementById('editor-theme').value = 'textmate';
    set_theme('light');
}

function set_theme(theme) {
    console.log(`[SET] page theme to ${theme}...`)
    const ace_theme = editor.getTheme().split("/").at(-1);
    if ((theme === "light" || theme === "light-contrast") && !light_themes.includes(ace_theme)) {
        change_editor_theme('textmate');
    } else if ((theme === "dark" || theme === "dark-contrast") && !dark_themes.includes(ace_theme)) {
        change_editor_theme('cloud9_night_low_color');
    }

    body.classList = [`${theme}-body ${theme}`];
    banner.classList = [`${theme}-banner header-container ${theme}`];
    document.getElementById('menu').classList = [`${theme}-menu menu open ${theme}`];
    document.getElementById('menu-btn').classList = [`${theme}-menu-btn menu-btn ${theme}`];
    document.getElementById('close-menu-btn').classList = [`${theme}-close-menu-btn close-menu-btn ${theme}`];
    document.getElementById('reset-btn').classList = [`${theme}-reset-btn reset-btn ${theme}`];
    document.getElementById('font-input').classList = [`${theme}-font-input font-input ${theme}`];
    editor_container.classList = [`${theme}-editor-container editor-container ${theme}`];
    editor_header.classList = [`${theme}-editor-header editor-header ${theme}`];
    // code_container.classList = [`${theme}-code-container code-container ${theme}`];
    output_container.classList = [`${theme}-output-container output-container ${theme}`];
    output_header.classList = [`${theme}-output-header output-header ${theme}`];
    output_area.classList = [`${theme}-output-area output-area ${theme}`];
    input_container.classList = [`${theme}-input-container input-container ${theme}`];
    input_header.classList = [`${theme}-input-header input-header ${theme}`];
    input_area.classList = [`${theme}-input-area input-area ${theme}`];
    document.querySelectorAll('span.checkmark').forEach(checkmark => checkmark.classList = [`${theme}-checkmark checkmark`]);

    document.getElementById(`${theme}-theme`).checked = "checked";
}


// Handler for custom keyboard shortcuts
document.addEventListener("keydown", function(event) {

    // ESC (while in editor) - Escape from editor (while keeping tab functionality)
    if (event.key === 'Escape' && document.activeElement.id === 'ace_text-input') {
        console.log("[ESCAPE] text editor");
        event.preventDefault();
        clear_input_button.focus();
    }

    // Ctrl + R - Run code (from anywhere, except when menu is open)
    if (event.ctrlKey && event.key === 'r' && !document.getElementById('menu')) {
        event.preventDefault();
        run_code();
    }

    // Ctrl + S - Stop code execution (from anywhere when code is executing, except when menu is open)
    if (event.ctrlKey && event.key === 's' && document.getElementById('stop-btn')) {
        event.preventDefault();
        stop_code();
    }

    // Ctrl + M - Open menu
    if (event.ctrlKey && event.key === 'm' && !document.getElementById('menu')) {
        event.preventDefault();
        show_menu();
    }

    // ESC (while in menu) - Escape from menu
    if (event.key === 'Escape' && document.getElementById('menu')) {
        event.preventDefault();
        hide_menu();
    }
});

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
