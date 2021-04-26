export class Converter {

    constructor() {
        this.initialise();
        this.createStyles();
    }

    initialise() {
        const container = document.createElement('div');
        container.style.position = 'relative';
        document.body.appendChild(container);

        this.converterContainer = document.createElement('div');
        this.converterContainer.classList.add('converter-container');

        this.createConverterContent();

        container.appendChild(this.converterContainer);
    }

    createConverterContent() {
        this.converterContainer.innerHTML = '';
        const title = document.createElement('h2');
        title.textContent = 'Converter';

        const form = document.createElement('form');
        form.classList.add('content');

        const source = document.createElement('input');
        source.required = true;
        source.id = 'source';
        source.type = 'number';
        source.placeholder = 'E.g: 10 (in decimal format)';

        const sourceLabel = document.createElement('label');
        sourceLabel.for = 'source';
        sourceLabel.textContent = 'Type source numberal system';

        const target = document.createElement('input');
        target.required = true;
        target.id = 'target';
        target.type = 'number';
        target.placeholder = 'E.g: 7 (in decimal format)';

        const targetLabel = document.createElement('label');
        targetLabel.for = 'target'
        targetLabel.textContent = 'Type target numberal system';
        
        const convnumber = document.createElement('input');
        convnumber.required = true;
        convnumber.id = 'convnumber';
        convnumber.type = 'text';
        convnumber.placeholder = 'E.g: 120 or 01010 or A5';
        
        const convnumberLabel = document.createElement('label');
        convnumberLabel.for = 'convnumber'
        convnumberLabel.textContent = 'Type number to convertion';

        const btn = document.createElement('button');
        btn.textContent = 'Convert';

        form.appendChild(sourceLabel);
        form.appendChild(source);
        form.appendChild(targetLabel);
        form.appendChild(target);
        form.appendChild(convnumberLabel);
        form.appendChild(convnumber);
        form.appendChild(btn);
        form.addEventListener('submit', this.submit.bind(this));

        const resultOutput = document.createElement('div');
        resultOutput.id = 'result';
        resultOutput.classList.add('result-container', 'success');
        
        const errorOutput = document.createElement('div');
        errorOutput.id = 'error';
        errorOutput.classList.add('result-container', 'error');

        this.converterContainer.appendChild(title);
        this.converterContainer.appendChild(form);
        this.converterContainer.appendChild(resultOutput);
        this.converterContainer.appendChild(errorOutput);
    }

    createStyles() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
        .converter-container {
            box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
            width: 100%;
            max-width: 500px;
            height: auto;
            padding-bottom: 5px;
            background-color: #1c1c1c;
            font-family: Helvetica, Arial ,sans-serif;
        }

        .converter-container h2 {
            margin: 0;
            padding: 20px 20px;
            color: #fff;
            background-color: #03A062;
        }

        .converter-container .content {
            margin: 20px 10px ;
            padding: 10px;
            display: flex;
            background-color: #1c1c1c;
            flex-direction: column
        }

        .converter-container from * {
            margin: 5px 0;
        }
        
        .converter-container form input {
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 4px;
            background-color: #545454;
            color: #fff;
        }

        ::placeholder {
            color: #a1a1a1;
            opacity: 1; 
          }

        .converter-container form label {
            padding: 10px 7px 3px 7px;
            margin-bottom: 5px;
            border-radius: 4px;
            font-size: 14px;
            color: #fff;
        }

        .converter-container form button {
            cursor: pointer;
            background-color: #03A062;
            color: #fff;
            border: 0;
            border-radius: 4px;
            padding: 10px;
            margin-top: 10px;
        }

        .converter-container form button:hover {
            background-color: #01824f;
        }

        .success {
            background-color: #03A062;
        }

        .error {
            background-color: #a00303;
        }

        .result-container {
            margin: 20px 20px ;
            color: #fff;
            border-radius: 4px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            display: none;
            font-size: 14px;
        }
        `.replace(/^\s+|\n/gm, '');
        document.head.appendChild(styleTag);
    }

    submit(event) {
        event.preventDefault();
        const formSubmission = {
            source: event.srcElement.querySelector('#source').value,
            target: event.srcElement.querySelector('#target').value,
            convnumber: event.srcElement.querySelector('#convnumber').value,
        };

        const result = this.converterFunction(formSubmission);
        const resultContainer = this.converterContainer.querySelector('#result');
        const errorContainer = this.converterContainer.querySelector('#error');
        
        if(!this.errorHandler(result)) {
            resultContainer.style.display = 'none';
            errorContainer.style.display = 'none';
            errorContainer.style.display = 'block';
            errorContainer.innerText = `Error! Please check your inputs data.`;     
        } else {
            errorContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            resultContainer.innerText = `The convertion result: ${result}`;     
        }

        console.log(formSubmission);
        console.log(result);

    }

    converterFunction(formSubmission) {
        return parseInt(formSubmission.convnumber, formSubmission.source).toString(formSubmission.target);
    }
    
    errorHandler(num) {
        return !isNaN(parseFloat(num) && isFinite(num));
    }
}