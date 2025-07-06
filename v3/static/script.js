
// Scripts for setting up Ace editor
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

// Buttons
const menu_button = document.getElementById('menu-btn');
const hide_menu_button = document.getElementById('close-menu-btn');
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

async function run_code() {
    console.log("[RUN] button pressed...")
    const code = editor.getValue();
    const input = input_area.value

    if (!code.trim()) {
        console.log("[ERROR] Cannot run empty code...")
        output_area.value = "ERROR: Cannot run empty code...";
        return
    }

    console.log("[SENDING] code to server...")

    if (input.trim()) {
        console.log("[SENDING] input to server...")
    }

    const response = await fetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            "input": input,
            "code": code
         })
    });

    run_button.classList = ['btn stop-btn'];
    run_button_label.textContent = 'Stop Code';
    run_button_icon.classList = ['fas fa-stop'];
    const stop_button = document.querySelector('#run-btn.stop-btn');

    stop_button.addEventListener('click', function(event) {
        if (run_button.classList.contains('stop-btn')) {
            console.log('[STOPPED] code execution...')
        }
    });

    const data = await response.json();
    console.log("[RECIEVED] data from server...")
    console.log(data)
    output_area.value = data.stdout;
    console.log(`[OUTPUT]:\n${data.stdout}`);

    run_button.classList = ['btn run-btn'];
    run_button_label.textContent = 'Run Code';
    run_button_icon.classList = ['fas fa-play'];

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
    // editor.focus();
}

function clear_input() {
    console.log("[CLEAR] input...")
    input_area.value = "";
    input_area.focus();
}

function show_menu() {
    console.log("[OPEN] side menu...")
    menu.classList.add('open');
    overlay.style.display = 'block';

    // menu.style.display = 'flex';
    menu.ariaHidden = 'false';

    menu_button.tabIndex = '-1';
    run_button.tabIndex = '-1';
    clear_code_button.tabIndex = '-1';
    clear_input_button.tabIndex = '-1';
    clear_output_button.tabIndex = '-1';
    input_area.tabIndex = '-1';
    // output_area.tabIndex = '-1';
    editor_input.tabIndex = '-1';
    ace_scrollbar.tabIndex = '-1';

    hide_menu_button.tabIndex = '0';
    reset_button.tabIndex = '0';
    font_input.tabIndex = '0';
    editor_theme_input.tabIndex = '0';
    document.querySelectorAll('.page-theme label input').forEach(input => input.tabIndex = '0');



}

function hide_menu() {
    console.log("[CLOSE] side menu...")
    menu.classList.remove('open');
    overlay.style.display = 'none';

    menu.ariaHidden = 'true';
    // menu.style.display = 'none';

    hide_menu_button.tabIndex = '-1';
    reset_button.tabIndex = '-1';
    font_input.tabIndex = '-1';
    editor_theme_input.tabIndex = '-1';
    document.querySelectorAll('.page-theme label input').forEach(input => input.tabIndex = '-1');

    menu_button.tabIndex = '0';
    run_button.tabIndex = '0';
    clear_code_button.tabIndex = '0';
    clear_input_button.tabIndex = '0';
    clear_output_button.tabIndex = '0';
    input_area.tabIndex = '0';
    // output_area.tabIndex = '0';
    editor_input.tabIndex = '0';
    ace_scrollbar.tabIndex = '0';

    menu_button.focus();
}


function change_font_size(font_size) {
    const default_font_size = 20;
    console.log(`[CHANGE] font size to ${font_size}px...`)
    editor_area.style.fontSize = `${font_size}px`;
    input_area.style.fontSize = `${font_size}px`;
    output_area.style.fontSize = `${font_size}px`;

    font_size_output.value = font_size;
}


function close_menu(event) {
    if (event.pointerType !== 'mouse') return;
    if (menu.classList.contains('open')) {
        var mouseClickWidth = event.clientX;
        if (window.innerWidth - mouseClickWidth >= menu.offsetWidth){
            console.log("[CLOSE] side menu...")
            menu.classList.remove('open');
            overlay.style.display = 'none';

            // menu.style.display = 'none';
            menu.ariaHidden = 'true';

            hide_menu_button.tabIndex = '-1';
            reset_button.tabIndex = '-1';
            font_input.tabIndex = '-1';
            editor_theme_input.tabIndex = '-1';
            document.querySelectorAll('.page-theme label input').forEach(input => input.tabIndex = '-1');

            menu_button.tabIndex = '0';
            run_button.tabIndex = '0';
            clear_code_button.tabIndex = '0';
            clear_input_button.tabIndex = '0';
            clear_output_button.tabIndex = '0';
            input_area.tabIndex = '0';
            // output_area.tabIndex = '0';
            editor_input.tabIndex = '0';
            ace_scrollbar.tabIndex = '0';
            
            menu_button.focus();
        }
    }

}
document.addEventListener("click", close_menu);


function change_editor_theme(theme) {
    console.log(`[SET] editor theme to ${theme}...`)
    editor.setTheme('ace/theme/' + theme);
    editor_theme_input.value = theme;
}

function reset_settings() {
    console.log("[RESET] to default settings...")
    change_font_size(20);
    editor.setTheme('ace/theme/textmate');
    editor_theme_input.value = 'textmate';
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
    menu.classList = [`${theme}-menu menu open ${theme}`];
    menu_button.classList = [`${theme}-menu-btn menu-btn ${theme}`];
    hide_menu_button.classList = [`${theme}-close-menu-btn close-menu-btn ${theme}`];
    reset_button.classList = [`${theme}-reset-btn reset-btn ${theme}`];
    font_input.classList = [`${theme}-font-input font-input ${theme}`];
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


function escape_editor(event) {
    if (event.ctrlKey && event.key === 'Tab') {
        console.log("ESCAPE");
        event.preventDefault();
    }
}
document.addEventListener("keydown", function(event) {
    if (event.key === 'Escape' && document.activeElement.id === 'ace_text-input') {
        console.log("[ESCAPE] text editor");
        event.preventDefault();
        // run_button.focus();
        clear_input_button.focus();
    }
});

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}