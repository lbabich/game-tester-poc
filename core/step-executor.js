async function execute(driver, steps) {
	const actions = driver.actions({ async: true });

	steps.forEach((step) => {
		console.log(actions[step.key])
		if (step.key === 'move') {
			actions[step.key](step.coordinates);
		} else if ('pause') {
			actions[step.key](step.time);
		} else {
			actions[step.key]();
		}
	})

	await driver.wait(async () => {
		console.log(actions.perform)
		await actions.perform();
		return true;
	}, 20000)

	return actions;
}

module.exports = {
	execute
}