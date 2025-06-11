import readline from 'readline';

/**
 * Retrieve input from the CLI
 *
 * @param {string} prompt Prepend a prompt before the cursor carrot
 * @param {boolean} hide Hide user input (replacing with stars)
 * @return {Promise<string>} User input
 */
export function ask(prompt: string, hide = false) {
	const rl: any = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
	return new Promise((resolve) => {
		if (!hide) {
			rl.question(prompt, (answer: string) => {
				resolve(answer);
				rl.close();
			});
		} else {
			let input = '';
			const onKeyPress = (char: string, key: any) => {
				if (key && key.name === 'return') {
					rl.input.setRawMode(false);
					rl.input.removeListener('keypress', onKeyPress);
					rl.close();
					resolve(input);
				} else {
					if (key && key.name === 'backspace') {
						if (input.length > 0) input = input.slice(0, -1);
					} else {
						input += char;
					}
					rl.output.write(`\r${prompt}${'*'.repeat(input.length)} `);
				}
			};

			// Attach keypress event
			rl.input.on('keypress', onKeyPress);
			rl.input.setRawMode(true);
			rl.input.resume();
			rl.output.write(prompt);
		}
	});
}
