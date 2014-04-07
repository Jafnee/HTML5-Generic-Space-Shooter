define([""], function () {
	var getMousePos = function getMousePos(evt) {
		game.mouse = true;
		var rect = canvas.getBoundingClientRect();
		game.mouseX = evt.clientX - rect.left;
		game.mouseY = evt.clientY - rect.top;
	}
	
	var mouseClicked = function mouseClicked() {
		switch (Game.screen) {
		case "main_menu":
			buttonCheck(Game.screen);
			break;
		case "game":
			playerShoot();
			break;
		}
	}
	
	var mainMenuButtonCheck = function mainMenuButtonCheck(screen) {
		var mouseX, mouseY, part1, part2;
		part1 = canvasWidth  / 4;
		part2 = canvasHeight / 4;
		mouseX = game.mouseX;
		mouseY = game.mouseY;
		if (screen === "main_menu") {
			if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
				game.screen = "game";
			}
			if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 && mouseY <= part2 + part2 * 0.7) {
				game.screen = "options";
			}
			if (mouseX >= part1 * 1.2 && mouseX <= part1 * 1.2 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
				game.screen = "stats";
			}
			if (mouseX >= part1 * 2.1 && mouseX <= part1 * 2.1 + part1 * 0.75 && mouseY >= part2 * 2 && mouseY <= part2 * 2 + part2 * 0.7) {
				game.screen = "about";
			}
		}
	}
	
	var playerShoot = function playerShoot() {
		"use strict";
		var bullet, i, tempDamage, tempType;
		bullet = {
			x:		100,
			y:		game.mouseY
		};
		switch (player.upgrade) {
		case 1:
			tempDamage = player.upgrade * 10;
			tempType = images.blueLaser1;
			break;
		}
		for (i = 0; i < player.guns; i += 1) {
			//gun1
			if (i === 0) {
				bullet.x += 60;
				bullet.y -= 5;
				bullet.type = tempType;
				bullet.damage = tempDamage;
				playerBullets.push(bullet);
				playerBullets.push(bullet);
			}
			//gun2
		}
	}
	var Action = {
		mouseClicked:			mouseClicked,
		playerShoot:			playerShoot,
		mainMenuButtonCheck:	mainMenuButtonCheck,
		getMousePos:			getMousePos
	};
	return Action;
});