let isClicked = 0;

document.addEventListener('DOMContentLoaded', () => {

    // Update code editor and output font-sizes using range input
    const rangeInput = document.getElementById('font-input');
    const textarea = document.getElementById('code');
    const lineNumbersArea = document.getElementById('line-numbers')
    const outputArea = document.getElementById('output-area')
    

    // rangeInput.addEventListener('input', () => {
    //     const newFontSize = rangeInput.value;
    //     textarea.style.fontSize = `${newFontSize}px`;
    //     lineNumbersArea.style.fontSize = `${newFontSize}px`;
    //     outputArea.style.fontSize = `${newFontSize}px`;
    //     displayLineNumbers();
    // })


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



    // Run button function
    const runButton = document.getElementById('run-btn');
    runButton.addEventListener('click', () => {
        isClicked += 1;
        console.log(isClicked);

        // Change run button to stop button
        document.getElementById('run-btn').textContent = 'Stop Code';
        document.getElementById('run-btn').className = 'stop';
        
        let code = document.getElementById('code').value;
        let lines = code.split('\n');
        let prompts = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf("input(") > -1) {
                const start = lines[i].indexOf("input(") + 6;
                const end = lines[i].substring(start);
                const prompt = end.substring(0, end.indexOf(')'));
                prompts.push(prompt);
            }
        }

        // Stop button functionality to cancel process
        if (isClicked % 2 === 0) {
            console.log("Process Stopped");
            document.getElementById('run-btn').className = 'run';
            document.getElementById('run-btn').textContent = 'Run Code';
            outputArea.value += "\n** Process Stopped **\n";
            // prompts = [];
            // lines = [];
            // code = "";
            return;
        }

        // Gets user input and runs code through server
        awaitUserInput(prompts, code);
    });


    // Clear button function
    const clearCodeButton = document.getElementById('clear-code-btn');
    const clearOutputButton = document.getElementById('clear-output-btn');
    
    clearCodeButton.addEventListener('click', () => {
        if(confirm("\n**WARNING**\n\nThis action will delete your code and make it unrecoverable.\nAre you sure you want to clear the code window?")) {
            document.getElementById('code').value = "\n# Write your code below...\n\n";
        }
    });

    clearOutputButton.addEventListener('click', () => {
        document.getElementById('output-area').value = "";
    });
});



async function awaitUserInput(prompts, code) {

    const outputArea = document.getElementById('output-area');
    outputArea.focus();
    let stop = 0;
    const inputs = []
    for (let i = 0; i < prompts.length; i++) {
        outputArea.value += prompts[i].substring(1,prompts[i].length - 1);
        const prev = outputArea.value;

        // if (isClicked > 1) {
        //     i += 1;
        // }

        await waitingEnterPress();
        await delay(1);

        const input = outputArea.value;
        const trimmedInput = input.substring(prev.length, input.length-1);
        inputs.push(trimmedInput);
    }


    for (let i = 0; i < prompts.length; i++) {
        code = code.replace("input(" + prompts[i] + ")", "'" + inputs[i] + "'");
    }

    const response = await fetch("/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });

    const data = await response.json();
    console.log(data.output);
    document.getElementById("output-area").value += data.output;
    document.getElementById('run-btn').className = 'run';
    document.getElementById('run-btn').textContent = 'Run Code';
    isClicked = 0;
}

function waitingEnterPress() {
    return new Promise((resolve) => {
        const outputArea = document.getElementById('output-area');
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
            if (e.key === "Enter") {
                document.removeEventListener('keydown', onKeyHandler);
                resolve();
            }
        }
    });
  }
  
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
  