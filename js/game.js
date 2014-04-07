//Canvas
var canvas;
var context;
var canvasWidth;
var canvasHeight;
var document;
var window;
var location;

//Background
var images;
var stars;
var star;
var noStars;

//Player
var player;

//Game Stats
var settings;
var fps;
var lastCalledTime;

var playerBullets;
var enemyBullets;
var game;
var enemies;
var enemy;

function generateStar(old) {
	"use strict";
	star = {
		y:		Math.floor(Math.random() * canvasHeight) + 1,
		speed:	Math.floor(Math.random() * 4) + 1
	};
	if (old) {
		star.x = canvasWidth;
	} else {
		star.x = Math.floor(Math.random() * canvasWidth) + 1;
	}
	return star;
}

function addStars() {
	"use strict";
	var i;
	for (i = 0; i < noStars; i += 1) {
		stars.push(generateStar());
	}
}

function incrementTimer() {
	"use strict";
	game.timer += 1;
}

function fpsCalc() {
	"use strict";
	var delta;
	//From http://goo.gl/eAK3jB
	if (!lastCalledTime) {
		lastCalledTime = new Date().getTime();
		fps = 0;
		return;
	}
	delta = (new Date().getTime() - lastCalledTime) / 1000;
	lastCalledTime = new Date().getTime();
	fps = "FPS: " + Math.floor(1 / delta);
}

//Drawing
function drawPlayerShip() {
	"use strict";
	if (game.mouse) {
		player.y = game.mouseY;
	}
	context.drawImage(images.gun0, player.x + 55, player.y - 8.5);
	context.drawImage(images.blueShip, player.x, player.y - 49.5);
}

function drawMainMenu() {
	"use strict";
	var part1, part2, start, options, stats, about, mouseX, mouseY;
	part1 = canvasWidth  / 4;
	part2 = canvasHeight / 4;
	mouseX = game.mouseX;
	mouseY = game.mouseY;
	//Button animation
	if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
		start = images.start1;
	} else {
		start = images.start0;
	}
	if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
		options = images.options1;
	} else {
		options = images.options0;
	}
	if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
		stats = images.stats1;
	} else {
		stats = images.stats0;
	}
	if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
		about = images.about1;
	} else {
		about = images.about0;
	}
	//drawing button
	context.drawImage(images.blueMetal, part1, 0, part1 * 2, part2 * 3.5);
	context.drawImage(images.bigLogo, part1 * 1.1, part2 * 0.1, part1 * 1.8, part2);
	context.drawImage(start, part1 * 1.2, part2, part1 * 0.75, part2 * 0.7);
	context.drawImage(options, part1 * 2.1, part2, part1 * 0.75, part2 * 0.7);
	context.drawImage(stats, part1 * 1.2, part2 * 2, part1 * 0.75, part2 * 0.7);
	context.drawImage(about, part1 * 2.1, part2 * 2, part1 * 0.75, part2 * 0.7);
}

function drawStars() {
	"use strict";
	var i, size, x, y;
	for (i = 0; i < stars.length; i += 1) {
		if (stars[i].x < 0) {
			stars[i] = generateStar(true);
		}
		size = stars[i].speed / 2;
		x = stars[i].x;
		y = stars[i].y;
		context.fillStyle = "rgba(255,255,255,0.5)";
		context.fillRect(x, y, size, size);
		//context.beginPath();
		//context.arc(x, y, size, 0, 2 * Math.PI, false);
		//context.fill();
		//context.closePath();
		stars[i].x -= stars[i].speed;
	}
}

function drawBullets() {
	"use strict";
	var i;
	for (i = 0; i < playerBullets.length; i += 1) {
		context.drawImage(playerBullets[i].type, playerBullets[i].x, playerBullets[i].y);
		if (playerBullets[i].x >= canvasWidth) {
			playerBullets.shift();
		} else {
			playerBullets[i].x += 40;
		}
	}
	for (i = 0; i < enemyBullets.length; i += 1) {
		context.drawImage(enemyBullets[i].type, enemyBullets[i].x, enemyBullets[i].y);
		if (enemyBullets[i].x >= canvasWidth) {
			enemyBullets.shift();
		} else {
			enemyBullets[i].x += 40;
		}
	}
}


function drawBackground() {
	"use strict";
	var mousex, mousey;
	mousex = game.mouseX;
	mousey = game.mouseY;
	//Black space
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	//Debris/Stars
	drawStars();
	//FPS indicator
	context.fillStyle = ("yellow");
	context.font = "40px Verdana";
	//TEST
	context.fillText(fps + " Mouse : " + mousex + " " + mousey, canvasWidth - 550, 40);
}

function draw() {
	"use strict";
	drawBackground();
	//Checks which screen user is on
	switch (game.screen) {
	case "main_menu":
		drawMainMenu();
		break;
	case "game":
		drawBullets();
		drawPlayerShip();
		break;
	}
	fpsCalc();
}

function animate() {
	"use strict";
	requestAnimationFrame(animate);
	draw();
}