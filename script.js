let language = document.getElementById("selectBox");
let code = document.getElementById("editor");
let response;

function initialConfig() {
	code.setAttribute("placeholder", "#Write your code here");
}

initialConfig();

let compileButton = document.getElementById("compile");
compileButton.setAttribute("onclick", "compileCode()");

function compileCode() {
    if (language.value == "null") {
        alert("Please select a language");
    }

    else if (code.value == "") { 
        alert("Please write your code");
    }

    let request = new XMLHttpRequest();
    request.open("POST", "https://codequotient.com/api/executeCode");
    // request.crossDomain = true;
    request.setRequestHeader('Content-Type', 'application/json');
    let codeToSend = JSON.stringify(code.value);
    request.send(JSON.stringify({
        code: codeToSend,
        langId: language.value
    }));

    request.addEventListener("load", function () { 
        response = JSON.parse(request.response);
        
        setTimeout(getResponse(), 5000);
    });
}
