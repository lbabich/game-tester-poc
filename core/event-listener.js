function attach() {
	window.resultData = {
		loading: false,
		ready: false,
		close: false,
		spinStart: false,
		spinEnd: false,
		scaleChange: false,
		scrollToTop: false
	};

	window.addEventListener('message', (eventContext) => {
		if (eventContext.data && eventContext.data.method) {
			switch (eventContext.data.method) {
				case 'gel.loading': {
					window.resultData.loading = true;
				}
					break;
				case 'gel.ready': {
					window.resultData.ready = true;
				}
					break;
				case 'gel.spin.start': {
					window.resultData.spinStart = true;
				}
					break;
				case 'gel.spin.end': {
					window.resultData.spinEnd = true;
				}
					break;
			}
		}
	});
}

module.exports = {
	attach
}
