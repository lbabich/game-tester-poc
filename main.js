const { Builder, By, until } = require('selenium-webdriver');

const debuggerConsole = require('./core/debugger-console');
const eventListener = require('./core/event-listener');
const stepExecutor = require('./core/step-executor');

const USERNAME = 'iforiumsoftware1';
const AUTOMATE_KEY = 'y2GHpsVt5Vv2Nqftv8Bs';
// const browserstackURL = 'https://' + USERNAME + ':' + AUTOMATE_KEY + '@hub-cloud.browserstack.com/wd/hub';
// const capabilities = {
// 	os: 'Windows',
// 	os_version: '10',
// 	browserName: 'Chrome',
// 	browser_version: '86',
// 	name: 'iforiumsoftware1\'s First Test'
// }

const capabilities = {
	browserName: 'firefox',
	firefoxOptions: {
		mobileEmulation: {
			deviceName: 'Google Nexus 5'
		}
	}
};

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

function _createDriver() {
	const driver = new Builder()
		// .usingServer(browserstackURL)
		.withCapabilities(capabilities)
		.build();

	return driver;
}

(async function testRunner() {
	const driver = _createDriver();

	try {
		const url = 'https://gameflex-s000.iforium.com/gamelaunch/api/v2.0/game-launchers/gul/v1/launch/launch/?casinoid=S009-IFO-20&gameid=723&languagecode=en&playmode=demo&channelid=desktop&devicechannel=web&lobbyurl=https%3A%2F%2Fb2c-qa.high5casino.com%2Fcasino%2Flobby&currencycode=EUR&regulationsenabled=false&operatororigin=*'
		await driver.get(url);

		await driver.executeScript(eventListener.attach);

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
		await driver.executeScript(debuggerConsole.attach);
		await driver.sleep(2000);
		await stepExecutor.execute(driver, steps);
		await driver.sleep(5000);

	} catch (e) {
		console.log('failed', e)
	} finally {
		await driver.quit();
	}
})();