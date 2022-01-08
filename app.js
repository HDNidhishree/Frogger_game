document.addEventListener("DOMContentLoaded", () => {
	const squares = document.querySelectorAll(".grid div");
	const timeLeft = document.querySelector("#time-left");
	const result = document.querySelector("#result");
	const startButton = document.querySelector("#button");
	const carsLeft = document.querySelectorAll(".car-left");
	const carsRight = document.querySelectorAll(".car-right");
	const logsLeft = document.querySelectorAll(".log-left");
	const logsRight = document.querySelectorAll(".log-right");

	const width = 9;
	let currentIndex = 76;
	let timerId = null;
	let currentTime = 20;

	// render frog on starting block
	// squares[currentIndex].classList.add("frog");

	// move frog
	let moveFrog = (e) => {
		squares[currentIndex].classList.remove("frog");
		switch (e.keyCode) {
			case 37:
				if (currentIndex % width !== 0) currentIndex -= 1;
				break;
			case 38:
				if (currentIndex - width >= 0) currentIndex -= width;
				break;
			case 39:
				if (currentIndex % width < width - 1) currentIndex += 1;
				break;
			case 40:
				if (currentIndex + width < width * width) currentIndex += width;
				break;
		}
		squares[currentIndex].classList.add("frog");
		lose();
		win();
	};

	// move cars
	let autoMoveCars = () => {
		carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
		carsRight.forEach((carRight) => moveCarRight(carRight));
	};

	// move car left on a time loop
	let moveCarLeft = (carLeft) => {
		switch (true) {
			case carLeft.classList.contains("c1"):
				carLeft.classList.remove("c1");
				carLeft.classList.add("c2");
				break;
			case carLeft.classList.contains("c2"):
				carLeft.classList.remove("c2");
				carLeft.classList.add("c3");
				break;
			case carLeft.classList.contains("c3"):
				carLeft.classList.remove("c3");
				carLeft.classList.add("c1");
				break;
		}
	};

	// move car right on a time loop
	let moveCarRight = (carRight) => {
		switch (true) {
			case carRight.classList.contains("c1"):
				carRight.classList.remove("c1");
				carRight.classList.add("c3");
				break;
			case carRight.classList.contains("c2"):
				carRight.classList.remove("c2");
				carRight.classList.add("c1");
				break;
			case carRight.classList.contains("c3"):
				carRight.classList.remove("c3");
				carRight.classList.add("c2");
				break;
		}
	};

	// move logs
	let autoMoveLogs = () => {
		logsLeft.forEach((logLeft) => moveLogsLeft(logLeft));
		logsRight.forEach((logRight) => moveLogsRight(logRight));
	};

	// move logs left on a time loop
	let moveLogsLeft = (logsLeft) => {
		switch (true) {
			case logsLeft.classList.contains("l1"):
				logsLeft.classList.remove("l1");
				logsLeft.classList.add("l2");
				break;
			case logsLeft.classList.contains("l2"):
				logsLeft.classList.remove("l2");
				logsLeft.classList.add("l3");
				break;
			case logsLeft.classList.contains("l3"):
				logsLeft.classList.remove("l3");
				logsLeft.classList.add("l4");
				break;
			case logsLeft.classList.contains("l4"):
				logsLeft.classList.remove("l4");
				logsLeft.classList.add("l5");
				break;
			case logsLeft.classList.contains("l5"):
				logsLeft.classList.remove("l5");
				logsLeft.classList.add("l1");
				break;
		}
	};

	// move logs right on a time loop
	let moveLogsRight = (logsRight) => {
		switch (true) {
			case logsRight.classList.contains("l1"):
				logsRight.classList.remove("l1");
				logsRight.classList.add("l5");
				break;
			case logsRight.classList.contains("l2"):
				logsRight.classList.remove("l2");
				logsRight.classList.add("l1");
				break;
			case logsRight.classList.contains("l3"):
				logsRight.classList.remove("l3");
				logsRight.classList.add("l2");
				break;
			case logsRight.classList.contains("l4"):
				logsRight.classList.remove("l4");
				logsRight.classList.add("l3");
				break;
			case logsRight.classList.contains("l5"):
				logsRight.classList.remove("l5");
				logsRight.classList.add("l4");
				break;
		}
	};

	// rules to win Frogger
	let win = () => {
		if (squares[4].classList.contains("frog")) {
			result.innerHTML = "You Won the Game!!!!";
			squares[currentIndex].classList.remove("frog");
			clearInterval(timerId);
			document.removeEventListener("keyup", moveFrog);
		}
	};

	// rules to lose Frogger
	let lose = () => {
		if (
			currentTime === 0 ||
			squares[currentIndex].classList.contains("c1") ||
			squares[currentIndex].classList.contains("l5") ||
			squares[currentIndex].classList.contains("l4")
		) {
			result.innerHTML = "You Lost the Game!!!!";
			squares[currentIndex].classList.remove("frog");
			clearInterval(timerId);
			document.removeEventListener("keyup", moveFrog);
		}
	};

	// move the frog when its on the log moving left
	let moveWithLogLeft = () => {
		if (currentIndex >= 27 && currentIndex < 35) {
			squares[currentIndex].classList.remove("frog");
			currentIndex += 1;
			squares[currentIndex].classList.add("frog");
		}
	};

	// move the frog when its on the log moving right
	let moveWithLogRight = () => {
		if (currentIndex > 18 && currentIndex <= 26) {
			squares[currentIndex].classList.remove("frog");
			currentIndex -= 1;
			squares[currentIndex].classList.add("frog");
		}
	};

	// function to move all the pieces
	let movePieces = () => {
		currentTime--;
		timeLeft.textContent = currentTime;
		autoMoveCars();
		autoMoveLogs();
		moveWithLogLeft();
		moveWithLogRight();
		lose();
	};

	// to start an pause the game
	startButton.addEventListener("click", () => {
		if (timerId) {
			clearInterval(timerId);
		} else {
			timerId = setInterval(movePieces, 1000);
			document.addEventListener("keyup", moveFrog);
		}
	});
});
