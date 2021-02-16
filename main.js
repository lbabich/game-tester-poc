const { Builder, By, until } = require('selenium-webdriver');

const debuggerConsole = require('./core/debugger-console');
const eventListener = require('./core/event-listener');
const stepExecutor = require('./core/step-executor');

const USERNAME = 'iforiumsoftware1';
const AUTOMATE_KEY = 'y2GHpsVt5Vv2Nqftv8Bs';
const browserstackURL = 'https://' + USERNAME + ':' + AUTOMATE_KEY + '@hub-cloud.browserstack.com/wd/hub';
// const capabilities = {
// 	os: 'Windows',
// 	os_version: '10',
// 	browserName: 'Firefox',
// 	browser_version: '85',
// 	name: 'iforiumsoftware1\'s First Test',
// }

const capabilities = {
	browserName: 'firefox',
	firefoxOptions: {
		mobileEmulation: {
			deviceName: 'Google Nexus 5'
		}
	}
};

const tests = [
	{
		url: 'https://gameflex-s000.iforium.com/gamelaunch/api/v2.0/game-launchers/gul/v1/launch/launch/?casinoid=S009-IFO-20&gameid=723&languagecode=en&playmode=demo&channelid=desktop&devicechannel=web&lobbyurl=https%3A%2F%2Fb2c-qa.high5casino.com%2Fcasino%2Flobby&currencycode=EUR&regulationsenabled=false&operatororigin=*',
		steps: [
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
		]
	},
	{
		url: 'https://gameflex-s000.iforium.com/gamelaunch/api/v2.0/game-launchers/gul/v1/launch/launch/?casinoid=S009-IFO-20&gameid=19057&languagecode=en&playmode=demo&channelid=desktop&devicechannel=web&lobbyurl=https%3A%2F%2Fb2c-qa.high5casino.com%2Fcasino%2Flobby&currencycode=EUR&regulationsenabled=false&operatororigin=*',
		steps: [
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
		]
	}
];

function _createDriver() {
	const driver = new Builder()
		// .usingServer(browserstackURL)
		.withCapabilities(capabilities)
		.build();

	return driver;
}

async function _executeTestSuite(driver, test) {
	await driver.get(test.url);

	await driver.executeScript(eventListener.attach);

	await driver.wait(async () => {
		const value = await driver.executeScript(() => window.resultData);

		if (value.ready) {
			return value;
		}
	}, 20000);


	const container = await driver.wait(until.elementLocated(By.id('GameflexWidget-1')), 20000);
	await driver.wait(until.ableToSwitchToFrame(container), 20000, 'Switched to container context');

	const gameObject = await driver.wait(until.elementLocated(By.id('GameObjectContainer')), 20000);
	await driver.wait(until.ableToSwitchToFrame(gameObject), 20000, 'Switched to Game Context');
	await driver.wait(until.elementLocated(By.css('canvas')), 20000, 'Located Game Canvas context');
	await driver.executeScript(debuggerConsole.attach);
	await driver.sleep(2000);
	await stepExecutor.execute(driver, test.steps);
	await driver.sleep(5000);
}

(async function testRunner() {
	const driver = _createDriver();

	try {
		for (const test of tests) {
			await _executeTestSuite(driver, test);
		}
	} catch (e) {
		console.error(e);
	} finally {
		// await driver.quit();
	}
})();