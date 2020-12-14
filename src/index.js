const container = document.querySelector('.data-container');
const num = 20;
const frame_speed = 100;
function generateBlocks(num) {
	for (let i = 0; i < num; i += 1) {
		const value = Math.floor(Math.random() * 100) + 5;

		const block = document.createElement('div');
		block.classList.add('block');
		block.style.height = `${value * 3}px`;
		block.style.transform = `translateX(${i * 30}px)`;

		const blockLabel = document.createElement('label');
		blockLabel.classList.add('block__id');
		blockLabel.innerHTML = value;

		block.appendChild(blockLabel);
		container.appendChild(block);
	}
}

function swap(el1, el2) {
	return new Promise((resolve) => {
		const style1 = window.getComputedStyle(el1);
		const style2 = window.getComputedStyle(el2);

		const transform1 = style1.getPropertyValue('transform');
		const transform2 = style2.getPropertyValue('transform');

		el1.style.transform = transform2;
		el2.style.transform = transform1;

		// Wait for the transition to end!
		window.requestAnimationFrame(function () {
			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 300);
		});
	});
}

async function insertSort() {
	let blocks = document.querySelectorAll('.block');
	for (let i = 0; i < blocks.length; i++) {
		for (let j = i - 1; j > -1; j--) {
			blocks[j].style.backgroundColor = '#FF4949';
			blocks[j + 1].style.backgroundColor = '#13CE66';

			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, frame_speed)
			);

			const value1 = Number(blocks[j + 1].childNodes[0].innerHTML);
			const value2 = Number(blocks[j].childNodes[0].innerHTML);

			if (value1 < value2) {
				await swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll('.block');
			}

			blocks[j].style.backgroundColor = '#58B7FF';
			blocks[j + 1].style.backgroundColor = '#58B7FF';
		}
	}
}
async function bubbleSort() {
	let blocks = document.querySelectorAll('.block');
	for (let i = 0; i < blocks.length - 1; i += 1) {
		for (let j = 0; j < blocks.length - i - 1; j += 1) {
			blocks[j].style.backgroundColor = '#FF4949';
			blocks[j + 1].style.backgroundColor = '#13CE66';

			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, frame_speed)
			);

			const value1 = Number(blocks[j].childNodes[0].innerHTML);
			const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

			if (value1 > value2) {
				await swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll('.block');
			}

			blocks[j].style.backgroundColor = '#58B7FF';
			blocks[j + 1].style.backgroundColor = '#58B7FF';
		}
	}
}

async function selectionSort() {
	let blocks = document.querySelectorAll('.block');
	let convertedBlocks = Array.from(blocks);
	let len = convertedBlocks.length;
	for (let i = 0; i < len; i++) {
		let min = i;
		for (let j = i + 1; j < len; j++) {
			convertedBlocks[j].style.backgroundColor = 'red';
			convertedBlocks[min].style.backgroundColor = 'green';
			convertedBlocks[i].style.backgroundColor = 'orange';
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, frame_speed)
			);
			if (
				Number(convertedBlocks[min].childNodes[0].innerHTML) >
				Number(convertedBlocks[j].childNodes[0].innerHTML)
			) {
				convertedBlocks[min].style.backgroundColor = '#58B7FF';
				min = j;
			}
			convertedBlocks[j].style.backgroundColor = '#58B7FF';
		}
		if (min !== i) {
			let tmp = convertedBlocks[i];
			convertedBlocks[i] = convertedBlocks[min];
			convertedBlocks[min] = tmp;
			await swap(convertedBlocks[i], convertedBlocks[min]);
		}
		convertedBlocks[min].style.backgroundColor = '#58B7FF';
		convertedBlocks[i].style.backgroundColor = '#58B7FF';
	}
}
generateBlocks(num);
