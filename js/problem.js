window.addEventListener("DOMContentLoaded", (event) => {
	let codeEditor = document.getElementById("codeEditor");
	let lineCounter = document.getElementById("lineCounter");
	let codeRunner = document.getElementById("codeRunner");
	let keys = [];
	let problemID = localStorage.getItem("problemID");
	let lineCountCache = 0;
	let codeProblem;
	// ====================================== ALL EVENT LISTENERS ======================================
	let isResizing = false;

	(function () {
		let container = document.getElementById("barcha"),
			left = document.getElementById("left"),
			right = document.getElementById("right"),
			handle = document.getElementById("drag");
		handle.onmousedown = function (e) {
			isResizing = true;
		};
		document.onmousemove = function (e) {
			if (!isResizing) return;
			let offsetRight =
				container.clientWidth - (e.clientX - container.offsetLeft);
			left.style.setProperty("right", offsetRight + "px", "important");
			right.style.setProperty("width", offsetRight + "px", "important");
			// right.style.width = offsetRight + "px";
		};

		document.onmouseup = function (e) {
			isResizing = false;
		};
	})();

	// LISTEN INPUT EVENTS TO CODEEDITOR
	for (let i in problems) {
		if (problems[i].id == problemID) {
			codeProblem =
				localStorage.getItem("codeProblem") ||
				`function ${problems[i].funcName}(${problems[i].varName}){\n\n}`;
			console.log(codeProblem);
			codeEditor.value = codeProblem;
			line_counter();
			title.innerHTML = `${problems[i].id}. ${problems[i].title}`;
			difficulty.innerHTML = `${problems[i].difficulty.toUpperCase()}`;
			if (problems[i].difficulty == "easy") {
				difficulty.style.background = "rgb(21, 255, 0, 0.5)";
			} else if (problems[i].difficulty == "middle") {
				difficulty.style.background = "yellow";
				difficulty.style.color = "black";
			} else if (problems[i].difficulty == "hard") {
				difficulty.style.background = "red";
				difficulty.style.color = "black";
			}
			descriptTxt.innerHTML += `${problems[i].text}<br><br>`;
			for (let l = 0; l < 3; l++) {
				descriptTxt.innerHTML += `
        <code>
          <span class="extit">EXAMPLE ${l + 1}:</span> <br />
          <span class="ex">INPUT:</span>
          <span class="text">${problems[i].varName} = ${
					problems[i].tests[l]
				} </span><br />
          <span class="ex">OUTPUT:</span>
          <span class="text">${problems[i].answers[l]} </span><br />
        </code>
        <br>
`;
			}
		}
	}
	codeEditor.addEventListener("input", () => {
		tabCodes();
		line_counter();
		codeProblem = codeEditor.value;
		localStorage.setItem("codeProblem", codeProblem);
	});
	submitCodes.addEventListener("click", () => {
		try {
			let res = "";
			codeRunner.style.background = "";
			codeRunner.style.color = "";
			let code;
			for (let i in problems) {
				if (problems[i].id == problemID) {
					code = codeEditor.value.replace(
						`function ${problems[i].funcName}(${problems[i].varName})`,
						""
					);
					for (let l = 0; l < problems[i].tests.length; l++) {
						let func = new Function(problems[i].varName, code);
						if (func(problems[i].tests[l]) == problems[i].answers[l]) {
							res += `✅ ${func(problems[i].tests[l])}<br>`;
						} else {
							res += `❌ ${func(problems[i].tests[l])}<br>`;
						}
					}
				}
			}
			console.log(res);
			codeRunner.innerHTML = res;
		} catch (err) {
			codeRunner.style.background = "rgb(255, 50, 50)";
			codeRunner.innerHTML = err;
		}
	});
	runCodes.addEventListener("click", () => {
		writeCode();
		// try {
		// 	let res = "";
		// 	codeRunner.style.background = "";
		// 	codeRunner.style.color = "";
		// 	let code;
		// 	for (let i in problems) {
		// 		if (problems[i].id == problemID) {
		// 			code = codeEditor.value.replace(
		// 				`function ${problems[i].funcName}(${problems[i].varName}){`,
		// 				""
		// 			);
		// 			code = code.slice(0, code.lastIndexOf(`}`));
		// 			for (let l = 0; l < 3; l++) {
		// 				let func = new Function(problems[i].varName, code);
		// 				if (func(problems[i].tests[l]) == problems[i].answers[l]) {
		// 					res += `✅ ${func(problems[i].tests[l])}<br>`;
		// 				} else {
		// 					res += `❌ ${func(problems[i].tests[l])}<br>`;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	codeRunner.innerHTML = res;
		// } catch (err) {
		// 	codeRunner.style.background = "rgb(255, 50, 50)";
		// 	codeRunner.innerHTML = err;
		// }
	});
	// MOVE COUNTERBAR WHEN SCROL CODEEDITOR
	codeEditor.addEventListener("scroll", () => {
		lineCounter.scrollTop = codeEditor.scrollTop;
		lineCounter.scrollLeft = codeEditor.scrollLeft;
	});
	// LAY SPACES WHEN CLICKED TAB
	codeEditor.addEventListener("keydown", (e) => {
		let { keyCode } = e;
		let { value, selectionStart, selectionEnd } = codeEditor;
		if (keyCode === 9) {
			e.preventDefault();
			codeEditor.value =
				value.slice(0, selectionStart) + "    " + value.slice(selectionEnd);
			codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2);
		}
	});

	// ====================================== LINE COUNTER ======================================
	function line_counter() {
		let lineCount = codeEditor.value.split("\n").length;
		let outarr = new Array();
		if (lineCountCache != lineCount) {
			for (let x = 0; x < lineCount; x++) {
				outarr[x] = x + 1 + ".";
			}
			lineCounter.value = outarr.join("\n");
		}
		lineCountCache = lineCount;
	}
	// ====================================== REPLACE CODE WITH SPACE ======================================
	// ====================================== e.g/ clg => console.log ======================================
	function tabCodes() {
		codeEditor.value = codeEditor.value.replace(/frz/g, `Farruxbek zo'r bola`);
		let oxiri = (i) => codeEditor.value[codeEditor.value.length - i];
		let cursorPos = (i, j) => {
			codeEditor.selectionStart = codeEditor.selectionEnd - i;
			codeEditor.selectionEnd = codeEditor.selectionEnd - i;
		};
		if (
			oxiri(1) == " " &&
			oxiri(2) == "r" &&
			oxiri(3) == "o" &&
			oxiri(4) == "f"
		) {
			codeEditor.value += "(let i = 0; i < count; i++){\n\n}";
		}
		if (codeEditor.value.includes("clg ")) {
			codeEditor.value = codeEditor.value.replace(/clg/g, "console.log('');");
			cursorPos(4);
		}
		if (codeEditor.value.includes("log ")) {
			codeEditor.value = codeEditor.value.replace(/log/g, "console.log('');");
			cursorPos(4);
		}
		if (oxiri(1) == " " && oxiri(2) == "f" && oxiri(3) == "i") {
			codeEditor.value += "	(){\n\n}";
			cursorPos(5, 6);
		}
		if (
			oxiri(1) == " " &&
			oxiri(2) == "h" &&
			oxiri(3) == "c" &&
			oxiri(4) == "t" &&
			oxiri(5) == "i" &&
			oxiri(6) == "w" &&
			oxiri(7) == "s"
		) {
			codeEditor.value += `() {\n\tcase value:\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}`;
			cursorPos(8);
			console.log(codeEditor.selectionStart);
		}
		if (
			oxiri(1) == " " &&
			oxiri(2) == "c" &&
			oxiri(3) == "n" &&
			oxiri(4) == "u" &&
			oxiri(5) == "f"
		) {
			codeEditor.value = codeEditor.value.replace(/func /g, "function(){\n\n}");
			cursorPos(5, 9);
		}
		if (oxiri(1) == "{" && keys[keys.length - 2] != 8) {
			codeEditor.value += "}";
		} else if (oxiri(1) == "(") {
			codeEditor.value += ")";
		} else if (oxiri(1) == "[") {
			codeEditor.value += "]";
		} else if (oxiri(1) == "{") {
			codeEditor.value += "}";
		} else if (oxiri(1) == '"') {
			codeEditor.value += '"';
			cursorPos(1, 1);
		}
		if (keys[keys.length - 1] === 13 && keys[keys.length - 2] == 17) {
			codeEditor.value = codeEditor.value.replace(/;/g, ";\n");
		}
	}
	// ====================================== WRITE CODE TO CODERUNNER SECTION ======================================
	function writeCode() {
		let javob = "OUTPUT : \n\n";
		function myLog(smth) {
			if (Array.isArray(smth)) {
				javob += `[${smth}]\n`;
			} else {
				javob += smth + "\n";
			}
		}
		res = codeEditor.value.replace(/console.log/g, `myLog`);
		//  SET COLOR CODERUNNER WHEN YOU GET ERROR
		try {
			codeRunner.style.background = "";
			codeRunner.style.color = "";
			res = eval(`${res}`);
			codeRunner.innerHTML = javob;
		} catch (err) {
			codeRunner.style.background = "rgb(255, 50, 50)";
			codeRunner.innerHTML = err;
		}
	}
});
