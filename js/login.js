formRegister.addEventListener("submit", (event) => {
	event.preventDefault();
	let [email, password] = [event.target.email, event.target.password];
	users = JSON.parse(localStorage.getItem("users")) || users;
	user = JSON.parse(localStorage.getItem("user")) || "";
	for (let i in users) {
		console.log(atob(users[i].email), atob(users[i].password));
		if (
			atob(users[i].email) == email.value &&
			atob(users[i].password) == password.value
		) {
			user = {
				id: users[i].id,
				name: users[i].name,
				email: users[i].email,
				password: users[i].password,
				img: users[i].img,
				date: users[i].date,
			};
			localStorage.setItem("users", JSON.stringify(users));
			localStorage.setItem("user", JSON.stringify(user));
			email.value = "";
			password.value = "";
			location.href = "index.html";
		}
	}
	alert1.classList.remove("d-none");
	errorAlert.innerHTML = `Email yoki Parol xato !!!`;
});
