user = JSON.parse(localStorage.getItem("user")) || "";
if (!user) location.href = "index.html";

for (let i in problems) {
	allContent.innerHTML += `
    <button onclick="func(this)" id="${problems[i].id}" class="d-flex justify-content-between problemTitles">
      <span class="title">${problems[i].id}. ${problems[i].title}</span>
      <span class="status ${problems[i].difficulty}">${problems[i].difficulty}</span>
    </button>
  `;
}

function func(x) {
	localStorage.setItem("codeProblem", "");
	localStorage.setItem("problemID", x.id);
	location.href = "problem.html";
}
