import readline from 'node:readline';

/**
 * Retrieve input form the CLI
 *
 * @param {string} prompt Prepend a prompt before the cursor carrot
 * @param {boolean} hide Hide user input (replacing with stars)
 * @return {Promise<string>} User input
 */
export function ask(prompt: string, hide = false): Promise<string> {
	const rl: any = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: true
	});

	return new Promise((resolve) => {
		if (!hide) {
			rl.question(prompt, (answer: string) => {
				rl.close();
				resolve(answer);
			});
		} else {
			rl.output.write(prompt);
			let input = '';

			// Listen for 'keypress' to handle masking
			rl.input.on('keypress', (char: string, key: any) => {
				if (key && key.name === 'return') {
					rl.output.write('\n'); // Submit on new line
					rl.close();
					resolve(input);
				} else if (key && key.name === 'backspace') {
					if (input.length > 0) {
						input = input.slice(0, -1);
						rl.output.write(`\r${prompt}${input.replaceAll(/./g, '*')} \b`);
					}
				} else {
					input += char;
					rl.output.write('\b*'); // Mask the input with '*'
				}
			});

			// Restore settings
			rl.input.setRawMode(true);
			rl.input.resume();
		}
	});
}
