function attach() {
	const coordinateElement = document.createElement('div');

	Object.assign(coordinateElement.style, {
		position: 'absolute',
		background: 'white',
		left: '0px',
		top: '0px',
		width: '200px',
		height: '100px',
		zIndex: '10000',
		color: '#000000',
	});

	coordinateElement.classList.add('test-area');

	document.body.appendChild(coordinateElement);
	_getCursorPosition(coordinateElement);

	function _getCursorPosition(element) {
		const canvas = document.querySelector('canvas');

		canvas.addEventListener('click', (event) => {
			const rect = canvas.getBoundingClientRect()
			const x = event.clientX - rect.left
			const y = event.clientY - rect.top

			element.innerText = `x: ${x} / y: ${y}`;
		});
	}
}

module.exports = {
	attach
};