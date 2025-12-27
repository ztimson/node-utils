import {execSync} from 'child_process';
import {spawn} from 'node:child_process';

export function $(str: TemplateStringsArray, ...args: string[]): Promise<string> {
	let cmd = str.reduce((acc, part, i) => acc + part + (args[i] || ''), '');
	return new Promise((res, rej) => {
		const proc = spawn(cmd, {shell: true});
		let stdout = '', stderr = '';
		proc.stdout.on('data', (data) => stdout += data);
		proc.stderr.on('data', (data) => stderr += data);
		proc.on('close', (code) => {
			if(code !== 0) return rej(new Error(stderr || stdout));
			res(stdout.trim());
		});
	});
}

export function $Sync(str: TemplateStringsArray, ...args: string[]): string {
	let cmd = str.reduce((acc, part, i) => acc + part + (args[i] || ''), '');
	return execSync(cmd, { encoding: 'utf-8' });
}
