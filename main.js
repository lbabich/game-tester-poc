const { Builder, By, until } = require('selenium-webdriver');
const USERNAME = 'iforiumsoftware1';
const AUTOMATE_KEY = 'y2GHpsVt5Vv2Nqftv8Bs';
const browserstackURL = 'https://' + USERNAME + ':' + AUTOMATE_KEY + '@hub-cloud.browserstack.com/wd/hub';
const capabilities = {
	os: 'Windows',
	os_version: '10',
	browserName: 'Chrome',
	browser_version: '86',
	name: 'iforiumsoftware1\'s First Test'
}

// const capabilities = {
// 	browserName: 'chrome',
// 	chromeOptions: {
// 		mobileEmulation: {
// 			deviceName: 'Google Nexus 5'
// 		}
// 	},
// 	firefoxOptions: {
// 		mobileEmulation: {
// 			deviceName: 'Google Nexus 5'
// 		}
// 	}
// };

function addEventListener() {
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

function getCursorPosition() {
	const canvas = document.querySelector('canvas')
	canvas.addEventListener('click', function(e) {
		const rect = canvas.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top
		alert('x: ' + x + ' y: ' + y)
	})
}

async function buildAndExecuteTestSteps(driver) {
	const actions = driver.actions({ async: true });

	const steps = [
		{
			key: 'move',
			coordinates: { x: 623, y: 624 }
		},
		{
			key: 'press',
		},
		{
			key: 'release',
		},
		{
			key: 'pause',
			time: 1000
		},
		{
			key: 'press',
		},
		{
			key: 'release',
		}
	];

	steps.forEach((step) => {
		if (step.key === 'move') {
			actions[step.key](step.coordinates);
		} else if ('pause') {
			actions[step.key](step.time);
		} else {
			actions[step.key]();
		}
	})

	await driver.wait(async () => {
		await actions.perform();
		return true;
	}, 20000)

	return actions;
}

(async function testRunner() {
	let driver = new Builder()
		.usingServer(browserstackURL)
		.withCapabilities(capabilities)
		.build();
	try {
		const url = 'https://gameflex-s000.iforium.com/gamelaunch/api/v2.0/game-launchers/gul/v1/launch/launch/?casinoid=S009-IFO-20&gameid=723&languagecode=en&playmode=demo&channelid=desktop&devicechannel=web&lobbyurl=https%3A%2F%2Fb2c-qa.high5casino.com%2Fcasino%2Flobby&currencycode=EUR&regulationsenabled=false&operatororigin=*'
		await driver.get(url);

		await driver.executeScript(addEventListener);

		await driver.wait(async () => {
			const value = await driver.executeScript(() => {
				return window.resultData
			});

			if (value.ready) {
				return value;
			}
		}, 20000);


		const container = await driver.wait(until.elementLocated(By.id('GameflexWidget-1')), 20000);
		await driver.wait(until.ableToSwitchToFrame(container), 20000, 'Switched to container context');

		const gameObject = await driver.wait(until.elementLocated(By.id('GameObjectContainer')), 20000);
		await driver.wait(until.ableToSwitchToFrame(gameObject), 20000, 'Switched to Game Context');
		await driver.wait(until.elementLocated(By.xpath('/html/body/div[4]/div/div/div[1]/canvas')), 20000, 'Located Game Canvas context');
		//
		await driver.sleep(2000);
		await buildAndExecuteTestSteps(driver)
		await driver.sleep(5000);

		// await driver.switchTo().parentFrame();

		// const value = await driver.wait(async () => {
		// const value = await driver.executeScript(() => {
		// 	return window.resultData
		// });
		//
		// if (value.ready) {
		// 	return value;
		// }
		// }, 20000);

		// console.log(value)
	} catch (e) {
		console.log('failed', e)
	} finally {
		await driver.quit();
	}
})();

