function boot() {
	let sessionbooted = localStorage.getItem("sessionbooted");
	let username = localStorage.getItem("username");

	if (sessionbooted === null || sessionbooted === "false") {
		sessionbooted = "false";
		if (window.location.href.includes("homepage.html") || window.location.href.includes("videoplayer.html") || window.location.href.includes("settings.html") || window.location.href.includes("upload.html")) {
			window.location.href = "index.html";
		}
	} else {
		if (window.location.pathname.endsWith("index.html")) {
			window.location.href = "homepage.html";
		}
	}
	if (username && document.getElementById("displayname")) {
		if (username === "MintyFlinty") {
			document.getElementById("displayname").innerText = "Admin " + username + ", Gary";
		} else {
			document.getElementById("displayname").innerText = username;
		}
	}

	session(sessionbooted);

}

function register() {
	const builtInAccounts = {
		MintyFlinty: { password: "1234", role: "admin", token: 76 },
		MOD: { password: "1278", role: "moderator" },
		d2s1: { password: "d2s1", role: "easteregg", token: 5469 }
	};

	const usernameInput = document.getElementById("username");
	const passwordInput = document.getElementById("password");
	const username = usernameInput ? usernameInput.value.trim() : "";
	const password = passwordInput ? passwordInput.value : "";

	if (!username || !password) {
		alert("Please enter both username and password.");
		return;
	}

	if (username.length < 3 || password.length < 3) {
		alert("Username and password must be at least 3 characters long.");
		return;
	}

	const rememberedUser = localStorage.getItem("username");
	const rememberedSession = localStorage.getItem("sessionbooted");
	if (rememberedSession === "true" && rememberedUser === username) {
		alert("You are already signed in as " + username + ". Redirecting to homepage.");
		window.location.href = "homepage.html";
		return;
	}

	if (builtInAccounts[username]) {
		const account = builtInAccounts[username];
		if (password !== account.password) {
			alert("Incorrect password for built-in account.");
			return;
		}
		localStorage.setItem("sessionbooted", "true");
		localStorage.setItem("username", username);
		localStorage.setItem("userrole", account.role);
		if (account.token) {
			localStorage.setItem("tokennumber", account.token);
		}
		window.location.href = "homepage.html";
		return;
	}

	let customAccounts = {};
	const storedCustom = localStorage.getItem("customAccounts");
	if (storedCustom) {
		try {
			customAccounts = JSON.parse(storedCustom) || {};
		} catch (error) {
			customAccounts = {};
		}
	}

	if (customAccounts[username]) {
		if (customAccounts[username].password !== password) {
			alert("Password is incorrect for this account.");
			return;
		}
		localStorage.setItem("sessionbooted", "true");
		localStorage.setItem("username", username);
		localStorage.setItem("userrole", "custom");
		localStorage.setItem("tokennumber", customAccounts[username].token);
		window.location.href = "homepage.html";
		return;
	}

	// Create a new custom account if it doesn't already exist.
	customAccounts[username] = {
		password: password,
		role: "custom",
		token: Math.floor(Math.random() * 9000) + 1000
	};

	localStorage.setItem("customAccounts", JSON.stringify(customAccounts));
	localStorage.setItem("sessionbooted", "true");
	localStorage.setItem("username", username);
	localStorage.setItem("userrole", "custom");
	localStorage.setItem("tokennumber", customAccounts[username].token);
	window.alert("Account created and signed in as " + username + ".");
	window.location.href = "homepage.html";
}

function session(sessionbooted) {
	if (sessionbooted === "false" && window.location.href.includes("index.html")) {
		window.alert("Do You Agree To The Terms of Service User?");	
	}
}

function videoselection(item) {
	if (!item) {
		alert("Invalid video selection.");
		return;
	}

	let selectionmessage = item.getAttribute('data-num');
	
	// Validate selection message
	selectionmessage = Number(selectionmessage);
	if (Number.isNaN(selectionmessage) || selectionmessage < 1 || selectionmessage > 25) {
		alert("Invalid video selection.");
		return;
	}

	const currentServer = localStorage.getItem('serveroption');
	if (currentServer) {
		const serverNum = Number(currentServer);
		if (!Number.isNaN(serverNum) && serverNum >= 1 && serverNum <= 4) {
			localStorage.setItem('AlgorithmSearchServerOutput', serverNum);
			localStorage.setItem('AlgorithmServerOutput', serverNum);
			localStorage.setItem('serveroption', serverNum);
			localStorage.setItem('serverfood', serverNum);
		}
	}
	
	localStorage.setItem("selectionmessage", selectionmessage);
	window.location.href = "videoplayer.html";
}

function upload() {
	window.location.href = "upload.html";
}

function logout() {
	localStorage.removeItem('sessionbooted');
	localStorage.removeItem('tokennumber');
	window.location.href = "index.html";
}

function search() {
	let SearchInput = document.getElementById("search");
	
	if (!SearchInput || !SearchInput.value) {
		alert("Please enter a search query.");
		return;
	}

	let pieces = SearchInput.value.trim().split(" ");

	if (pieces.length < 2) {
		alert("Enter search input like: server:2 video:5");
		return;
	}

	let serverParts = pieces[0].split(":");
	let videoParts = pieces[1].split(":");

	if (serverParts.length < 2 || videoParts.length < 2) {
		alert("Invalid search format. Use server:1-4 video:1-25");
		return;
	}

	let SERVERID = serverParts[1];
	let VIDEOID = videoParts[1];

	let ServerChoice = Number(SERVERID);
	let selectionmessage = Number(VIDEOID);

	if (Number.isNaN(ServerChoice) || Number.isNaN(selectionmessage) || ServerChoice < 1 || ServerChoice > 4 || selectionmessage < 1 || selectionmessage > 25) {
		alert("Invalid search format or values. Use server:1-4 video:1-25");
		return;
	}

	localStorage.setItem("AlgorithmSearchServerOutput", ServerChoice);
	localStorage.setItem("AlgorithmServerOutput", ServerChoice);
	localStorage.setItem("serveroption", ServerChoice);
	localStorage.setItem("serverfood", ServerChoice);
	localStorage.setItem("selectionmessage", selectionmessage);
	window.location.href = "videoplayer.html";
	return selectionmessage;
}

function usersettings() {
	window.location.href = "settings.html";
}

function wiki() {
	window.location.href = "https://en.wikipedia.org/wiki/User:MintyFlinty/sandbox";
}

function algorithm() {

	let AlgorithmThumbnailTuner = 25;
	
	let AlgorithmServerTuner = 4;

	let AlgorithmThumbnailOutput = Math.floor(Math.random() * AlgorithmThumbnailTuner) + 1;
	localStorage.setItem("AlgorithmThumbnailOutput", AlgorithmThumbnailOutput);

	let AlgorithmServerOutput = Math.floor(Math.random() * AlgorithmServerTuner) + 1;
	localStorage.setItem("AlgorithmServerOutput", AlgorithmServerOutput);

}

function email() {
	window.location.href = "email.html";
}

window.addEventListener("DOMContentLoaded", boot);

window.addEventListener("DOMContentLoaded", () => {

	if (window.location.href.includes("email.html")) {

		window.location.href = "https://mail.google.com/mail/?view=cm&fs=1&to=mintyflint000@gmail.com";

	}

});

window.addEventListener("DOMContentLoaded", () => {
	if (!window.location.href.includes("videoplayer.html")) {
		localStorage.removeItem('AlgorithmSearchServerOutput');
		localStorage.removeItem('recordedserver');
	}
});

window.addEventListener("DOMContentLoaded", () => {
	if (window.location.href.includes("settings.html")) {
		let tokenvalue = localStorage.getItem("tokennumber");
		const tokenElement = document.getElementById("tokennumber");
		if (tokenElement && tokenvalue) {
			tokenElement.innerText = "Live Account Number: " + tokenvalue;
		}
	}

});

window.addEventListener("DOMContentLoaded", () => {

	const servers = [
		"https://mintyflinty000.github.io/INLG9043685KJSFNLKW40695897572050928508IODJNKGNLSNFNESGLIJP",
		"https://mintyflinty000.github.io/LKBGIHOORIPJPRINEMBOERJHK29THUNO",
		"https://mintyflinty000.github.io/HDFGIUOIGBRJHWJRGNNIWRGJPWRHNOWIH",
		"https://mintyflinty000.github.io/GJNROHYTJIPBFUHOUBERIJPUGIHOERBJIHGO"
	];

	function tryLoadVideo(startIndex, selectionmessage) {
		let index = startIndex;
		
		// Validate inputs
		if (Number.isNaN(index) || index < 0) {
			index = 0;
		}
		if (index >= servers.length) {
			index = 0;
		}
		if (Number.isNaN(selectionmessage) || selectionmessage < 1 || selectionmessage > 25) {
			console.error("Invalid video ID:", selectionmessage);
			alert("Invalid video selection.");
			return;
		}

		let attemptCount = 0;
		const maxAttempts = servers.length;

		function loadVideo() {
			if (attemptCount >= maxAttempts) {
				console.error("Video not found on any server after all attempts.");
				alert("Video not found on any server.");
				return;
			}

			const currentIndex = (index + attemptCount) % servers.length;
			const serverUrl = servers[currentIndex];
			const videoPath = serverUrl + `/Videos/Video00${selectionmessage}.mp4`;
			const videoElement = document.getElementById("videoformat");

			if (!videoElement) {
				console.error("Video element not found in DOM");
				return;
			}

			// Clear previous handlers
			videoElement.onerror = null;
			videoElement.oncanplay = null;

			videoElement.oncanplay = () => {
				const videoname = "SERVER ID: " + (currentIndex + 1) + " - VIDEO ID: " + selectionmessage;
				const vidTitleElement = document.getElementById("vidtitle");
				if (vidTitleElement) {
					vidTitleElement.innerText = videoname;
				}
				localStorage.setItem("recordedserver", currentIndex + 1);
			};

			videoElement.onerror = () => {
				console.warn("Failed to load from server " + (currentIndex + 1));
				attemptCount++;
				videoElement.src = "";
				loadVideo();
			};

			videoElement.src = videoPath;
			videoElement.load();
			videoElement.play().catch((error) => {
				console.warn("Playback error on server " + (currentIndex + 1) + ":", error);
				// Autoplay may be blocked by browser; do not treat this as a server failure.
			});
		}

		loadVideo();
	}

	// Initialize server selection
	let serverId = Number(localStorage.getItem("AlgorithmSearchServerOutput") || localStorage.getItem("serveroption"));
	if (!serverId || serverId < 1 || serverId > 4) {
		let storedRandom = Number(localStorage.getItem("AlgorithmServerOutput"));
		if (!storedRandom || storedRandom < 1 || storedRandom > 4) {
			storedRandom = Math.floor(Math.random() * 4) + 1;
			localStorage.setItem("AlgorithmServerOutput", storedRandom);
		}
		serverId = storedRandom;
	}

	if (serverId >= 1 && serverId <= 4) {
		localStorage.setItem("serverselection", servers[serverId - 1]);
		localStorage.setItem("serveroption", serverId);
		localStorage.setItem("serverfood", serverId);
	}

	// Load thumbnails
	if (document.getElementById("thumbnail1")) {
		let initialServer = localStorage.getItem("serverselection") || servers[serverId - 1] || servers[0];
		let thumbnailServerIndex = servers.indexOf(initialServer);
		if (thumbnailServerIndex < 0 || thumbnailServerIndex >= servers.length) {
			thumbnailServerIndex = serverId - 1;
		}
		if (thumbnailServerIndex < 0 || thumbnailServerIndex >= servers.length) {
			thumbnailServerIndex = 0;
		}

		function loadThumbnail(imgElement, selection, serverIndex) {
			if (!imgElement) return;

			if (serverIndex < 0) {
				serverIndex = 0;
			}
			if (serverIndex >= servers.length) {
				imgElement.onerror = null;
				imgElement.src = "Data/PlaceholderThumbnail.jpg";
				return;
			}

			const thumbnailPath = servers[serverIndex] + "/Thumbnails/Thumbnail00" + selection + ".jpg";

			imgElement.onerror = () => {
				loadThumbnail(imgElement, selection, serverIndex + 1);
			};

			imgElement.src = thumbnailPath;
		}

		for (let i = 1; i <= 12; i++) {
			algorithm();
			let selection = Number(localStorage.getItem("AlgorithmThumbnailOutput"));
			let imgElement = document.getElementById("thumbnail" + i);
			if (!imgElement) continue;

			if (selection < 1 || selection > 25 || Number.isNaN(selection)) {
				selection = Math.floor(Math.random() * 25) + 1;
				localStorage.setItem("AlgorithmThumbnailOutput", selection);
			}

			loadThumbnail(imgElement, selection, thumbnailServerIndex);
			let parentbranch = imgElement.parentElement;
			if (parentbranch) {
				parentbranch.setAttribute("data-num", selection);
			}
		}
	}

	// Load video on videoplayer page
	if (document.getElementById("videoformat")) {
		let selectionmessage = localStorage.getItem("selectionmessage");

		if (window.location.href.includes("videoplayer.html") && selectionmessage) {
			selectionmessage = Number(selectionmessage);

			// Validate selection message
			if (Number.isNaN(selectionmessage) || selectionmessage < 1 || selectionmessage > 25) {
				console.error("Invalid selection message:", selectionmessage);
				alert("Invalid video selection.");
				return;
			}

			// Get the server to start from
			let startIndex = 0;
			const serverOption = localStorage.getItem("serveroption");
			if (serverOption) {
				let parsedServer = Number(serverOption);
				if (!Number.isNaN(parsedServer) && parsedServer >= 1 && parsedServer <= 4) {
					startIndex = parsedServer - 1;
				}
			}

			tryLoadVideo(startIndex, selectionmessage);
		}
	}

});
