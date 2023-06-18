let problems = [
	{
		id: 1,
		title: "Palindrome sonmi ?",
		varName: "son",
		text: "Sizga bitta son beriladi, siz esa uning palindrome yoki palindrome emasligini aniqlashingiz kerak.<br><br>\
						<i>Eslatma : palindrome son to'g'ri va teskari o'qilganda ham bir xil o'qiluvchi sonlardir  <i>",
		difficulty: "easy",
		funcName: "palindrome",
		tests: [33, 201, 20302, 12, 909, 000, 88, 96, 1011],
		answers: [
			"palindrome",
			"palindrome emas",
			"palindrome",
			"palindrome emas",
			"palindrome",
			"palindrome",
			"palindrome",
			"palindrome emas",
			"palindrome emas",
		],
	},
	{
		id: 2,
		title: "Sonning qarama-qarshisi",
		text: "Sizga bitta son beriladi, siz esa u sonning qarama-qarshisizni ya'ni  musbat bo'lsa manfiy, manfiy bo'lsa musbat son qaytarasiz ",
		varName: "son",
		difficulty: "easy",
		funcName: "qaramaQarshi",
		tests: [1, -2, -3, 4, -5, -6, 7, 8, -9, -10],
		answers: [-1, 2, 3, -4, 5, 6, -7, -8, 9, 10],
	},
	{
		id: 3,
		title: "Songacha tub yigindisi",
		text: "Sizga bitta son beriladi, siz esa u songacha bo'lgan tub sonlar yig'indisini qaytaring ",
		varName: "son",
		difficulty: "middle",
		funcName: "qaramaQarshi",
		tests: [2, 6, 11, 20, 10, 13, 18, 17],
		answers: [0, 10, 17, 77, 17, 28, 58, 41],
	},
	{
		id: 4,
		title: "So'zni boshi-oxirini almashtirish",
		text: "Sizga berilgan so'zning birinchi va oxirgi harflarini o'rnini almashting",
		varName: "word",
		difficulty: "middle",
		funcName: "boshiOxiri",
		tests: [
			"salom",
			"osmon",
			"kitob",
			"dasturlash",
			"daftar",
			"qalam",
			"bola",
			"it",
		],
		answers: [
			"malos",
			"nsmoo",
			"bitok",
			"hasturlasd",
			"raftad",
			"malaq",
			"aolb",
			"ti",
		],
	},
];

let users = [
	{
		id: 1,
		name: "FarruxDEV",
		email: "farruxdev@gmail.com",
		password: "123123123",
		img: "https://quotefancy.com/media/wallpaper/3840x2160/2003714-Linus-Torvalds-Quote-Talk-is-cheap-Show-me-the-code.jpg",
		date: "1670517554015",
	},
];
for (let i in users) {
	users[i].email = btoa(users[i].email);
	users[i].password = btoa(users[i].password);
}
