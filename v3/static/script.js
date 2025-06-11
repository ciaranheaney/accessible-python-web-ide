
function clear_code() {
    const code_area = document.getElementById('code-area');
    code_area.value = "";
    code_area.focus();
}

function clear_output() {
    const output_area = document.getElementById('output-area');
    output_area.value = "";
    document.getElementById('code-area').focus();
}


function show_menu() {
    document.getElementById('menu').classList.add('open');
    document.getElementById('menu-btn').tabIndex = '-1';
    document.getElementById('close-menu-btn').tabIndex = '0';
}

function hide_menu() {
    document.getElementById('menu').classList.remove('open');
    document.getElementById('close-menu-btn').tabIndex = '-1';
    document.getElementById('menu-btn').tabIndex = '0';
}

function change_font_size(font_size) {
    document.getElementById('code-area').style.fontSize = `${font_size}px`;
    document.getElementById('output-area').style.fontSize = `${font_size}px`;
    document.getElementById('line-numbers').style.fontSize = `${font_size}px`;
    document.getElementById('font-size-output').value = font_size;
}













document.addEventListener('DOMContentLoaded', () => {

    // Update code editor and output font-sizes using range input
    const rangeInput = document.getElementById('font-input');
    const textarea = document.getElementById('code-area');
    const lineNumbersArea = document.getElementById('line-numbers')
    const outputArea = document.getElementById('output-area')

    // Generates line numbers based on textarea contents
    const textareaStyles = window.getComputedStyle(textarea);

    [
        'fontFamily',
        'fontSize',
        'fontWeight',
        'letterSpacing',
        'lineHeight',
        'padding',
    ].forEach((property) => {
        lineNumbersArea.style[property] = textareaStyles[property];
    });

    const parseValue = (v) => v.endsWith('px') ? parseInt(v.slice(0,-2), 10) : 0;

    const font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
    const paddingLeft = parseValue(textareaStyles.paddingLeft)
    const paddingRight = parseValue(textareaStyles.paddingRight)

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;

    const calculateNumLines = (str) => {
        const textareaWidth = textarea.getBoundingClientRect().width - paddingLeft - paddingRight;
        const words = str.split(' ');
        let lineCount = 0;
        let currentLine = '';
        for (let i = 0; i < words.length; i++) {
            const wordWidth = context.measureText(words[i] + '').width;
            const lineWidth = context.measureText(currentLine).width;

            if (lineWidth + wordWidth > textareaWidth) {
                lineCount++;
                currentLine = words[i] + ' ';
            } else {
                currentLine += words[i] + ' ';
            }
        }

        if (currentLine.trim() !== '') {
            lineCount++;
        }

        return lineCount;
    };


    const calculateLineNumbers = () => {
        // OPTION TO SWITCH BACK FOR TEXT WRAPPING AND LINE NUMBERS FOLLOWING
        // const lines = textarea.value.split('\n');
        // const numLines = lines.map((line) => calculateNumLines(line));

        // let lineNumbers = [];
        // let i = 1;
        // while (numLines.length > 0) {
        //     const numLinesOfSentence = numLines.shift()
        //     console.log(numLines);
        //     lineNumbers.push(i)
        //     if (numLinesOfSentence > 1) {
        //         Array(numLinesOfSentence - 1)
        //             .fill('')
        //             .forEach((_) => lineNumbers.push(''));
        //     }
        //     i++;
        // }
        // return lineNumbers;

        // OPTION FOR NO TEXT WRAPPING WITH HORIZONTAL SCROLLBAR
        const numLines = textarea.value.split('\n').length;
        let lineNumbers = [];
        for (let i = 1; i <= numLines; i++) {
            lineNumbers.push(i);
        }
        return lineNumbers;
    };


    const displayLineNumbers = () => {
        const lineNumbers = calculateLineNumbers();
        lineNumbersArea.innerHTML = Array.from({
            length: lineNumbers.length
        }, (_, i) => `<div>${lineNumbers[i] || '&nbsp;'}</div>`).join('\n');
    };


    textarea.addEventListener('input', () => {
        displayLineNumbers()
    });

    displayLineNumbers();

    const ro = new ResizeObserver(() => {
        const rect = textarea.getBoundingClientRect();
        lineNumbersArea.style.height = `${rect.height}px`;
        displayLineNumbers();
    })
    ro.observe(textarea)

    textarea.addEventListener('scroll', () => {
        lineNumbersArea.scrollTop = textarea.scrollTop;
    });


    rangeInput.addEventListener('input', () => {
        const newFontSize = rangeInput.value;
        textarea.style.fontSize = `${newFontSize}px`;
        lineNumbersArea.style.fontSize = `${newFontSize}px`;
        outputArea.style.fontSize = `${newFontSize}px`;
        displayLineNumbers();
    })

});
