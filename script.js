let language = document.getElementById("selectBox");
let codeEditor = document.getElementById("editor");
let displayOutput = document.getElementById("outputScreen");

function initialConfig() {
	codeEditor.setAttribute("placeholder", "#Write your code here");
}

initialConfig();

let compileButton = document.getElementById("compile");
compileButton.addEventListener("click", compileCode);

function compileCode() {
	if (language.value == "null") {
		alert("Please select a language");
	} else if (codeEditor.value == "") {
		alert("Please write your code");
	} else {
		let request = new XMLHttpRequest();
		let data = { code: codeEditor.value, langId: language.value };
		let jsonData = JSON.stringify(data);
		console.log(jsonData);

		request.open("POST", "https://codequotient.com/api/executeCode");
		// request.crossDomain = true;
		request.setRequestHeader("Content-Type", "application/json");
		request.send(jsonData);

		setTimeout(function () {
			let response = JSON.parse(request.responseText);
			console.log(response);
			getResponse(response.codeId);
		}, 2000);
	}
}

function getResponse(codeId) {
	let request = new XMLHttpRequest();
	request.open("GET", `https://codequotient.com/api/codeResult/${codeId}`);
	request.send();

	request.addEventListener("load", function (event) {
		console.log(event.target.responseText);
		let receivedData = JSON.parse(event.target.responseText);

		let tempOutput = JSON.parse(receivedData.data);

		displayOutput.scrollIntoView({ behavior: "smooth" });

		if (tempOutput.output != "") {
			displayOutput.innerHTML = tempOutput.output;
		} else {
			displayOutput.innerHTML = tempOutput.errors;
		}
	});
}
