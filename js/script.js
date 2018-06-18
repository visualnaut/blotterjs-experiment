/*jshint esversion: 6 */

$(function () {
	"use strict";
	var blotterText = [],
		blotter = [],
		material = [],
		scope = [],
		mOff,
		mRot,
		elem,
		letters = ["V", "I", "S", "U", "A", "L", "N", "A", "U", "T"],
		lProp = {
			size: [290, 98, 178, 47, 165, 88, 30, 35, 89, 190],
			posX: [28, 60, 80, 0, -5, 63, 9, 80, 29, 7],
			posY: [14, 10, 30, 77, 5, 67, 2, 8, 5, 55],
		};

	for (let l = 0; l < letters.length; l++) {
		blotterText[l] = new Blotter.Text(letters[l], {
			family: "'Helvetica', 'Arial', sans-serif",
			size: lProp.size[l],
			fill: "#171717",
			weight: 900,
			paddingLeft: 80,
			paddingRight: 80
		});

		material[l] = new Blotter.ChannelSplitMaterial();
		blotter[l] = new Blotter(material[l], {
			texts: blotterText[l]
		});
		scope[l] = blotter[l].forText(blotterText[l]);
		let blotterDOM = $("<div/>").addClass("blotter-item").attr("id", "blotter-" + l).css({
				'top': lProp.posY[l] + "%",
				'left': lProp.posX[l] + "%"
			});
		$("#stage").append(blotterDOM).clone();
		elem = document.getElementById("blotter-"+l);
		scope[l].appendTo(elem);
	}

	$(document).mousemove(function (e) {
		let mX = e.pageX;
		let mY = e.pageY;
		for (let l = 0; l < letters.length; l++) {
			let box = $("#blotter-"+l+" canvas");
			mRot = calRotation(box, mX, mY);
			mOff = calOffset(box, mX, mY);
			material[l].uniforms.uRotation.value = mRot;
			material[l].uniforms.uOffset.value = mOff;
		}
	});

	function calOffset(elem, mouseX, mouseY) {
		let distance = Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
		let offset = distance / 1000;
		if (offset >= 0.3) {
			return 0.3;
		}
		return offset;
	}

	function calRotation(elem, mouseX, mouseY) {
		let boxCenter = [elem.offset().left + elem.width() / 2, elem.offset().top + elem.height() / 2];
		let rad = Math.atan2(mouseX - boxCenter[0], mouseY - boxCenter[1]);
		return (rad * (180 / Math.PI) * -1) + 90;
	}
});