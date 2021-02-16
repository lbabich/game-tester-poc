function attach() {
	const coordinateElement = document.createElement('textarea');

	Object.assign(coordinateElement.style, {
		position: 'absolute',
		background: 'white',
		left: '0px',
		top: '0px',
		width: '200px',
		height: '100px',
		zIndex: '100',
		color: '#000000',
	});

	coordinateElement.classList.add('test-area');
	console.log('-----------', document)
	document.body.appendChild(coordinateElement);
	_attachClickListener();

	function _attachClickListener() {
		const canvas = document.querySelector('canvas');

		canvas.addEventListener('click', (event) => {
			const rect = canvas.getBoundingClientRect()
			const x = event.clientX - rect.left
			const y = event.clientY - rect.top
			_logMessage('click', `x: ${x} / y: ${y}`);
			_createClickElement(x, y);
		});
	}

	function _logMessage(eventName, value) {
		coordinateElement.value += `${eventName} - ${value}\n`;
	}

	function _createClickElement(x, y) {
		const clickElement = document.createElement('div');

		Object.assign(clickElement.style, {
			position: 'absolute',
			background: 'red',
			left: `${x}px`,
			top: `${y}px`,
			width: '20px',
			height: '20px',
			zIndex: '1000',
			borderRadius: '100%'
		});

		document.body.appendChild(clickElement);

		setTimeout(() => {
			clickElement.parentNode.removeChild(clickElement);
		}, 1000);
	}
}

module.exports = {
	attach
};