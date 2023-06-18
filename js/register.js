formRegister.addEventListener("submit", (event) => {
	event.preventDefault();
	let [username, email, password, img] = [
		event.target.username,
		event.target.email,
		event.target.password,
		event.target.img,
	];
	users = JSON.parse(localStorage.getItem("users")) || users;
	for (let i in users) {
		if (email.value == atob(users[i].email)) {
			alert1.classList.remove("d-none");
			errorAlert.innerHTML = `Bu emailga akkaunt ochilgan`;
			return;
		}
	}
	if (!username.value || !email.value || !password.value) {
		alert1.classList.remove("d-none");
		errorAlert.innerHTML = `Formani to'ldiring`;
	} else if (password.value.length < 8) {
		alert1.classList.remove("d-none");
		errorAlert.innerHTML = `Parol 8 tadan oshiq belgilar bo'lishi kerak`;
	} else if (!email.value.includes("@")) {
		alert1.classList.remove("d-none");
		errorAlert.innerHTML = `Emailni to'gri kiriting`;
	} else {
		users.push({
			id: users[users.length - 1].id + 1,
			name: username.value,
			email: btoa(email.value),
			password: btoa(password.value),
			img: img.value
				? img.value
				: "https://wallpaperset.com/w/full/f/4/e/461135.jpg",
			date: String(new Date().getTime()),
		});
		localStorage.setItem("users", JSON.stringify(users));
		username.value = "";
		email.value = "";
		password.value = "";
		img.value = "";
		location.href = "login.html";
	}
});
