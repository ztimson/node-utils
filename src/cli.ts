import {exec, execSync} from 'child_process';

export function $(str: TemplateStringsArray, ...args: string[]): Promise<string> {
	let cmd = str.reduce((acc, part, i) => acc + part + (args[i] || ''), '');
	return new Promise((res, rej) => exec(cmd, (err, stdout, stderr) => {
		if(err) return rej(stderr || err);
		return res(stdout);
	}))
}

export function $Sync(str: TemplateStringsArray, ...args: string[]): string {
	let cmd = str.reduce((acc, part, i) => acc + part + (args[i] || ''), '');
	return execSync(cmd, { encoding: 'utf-8' });
}
