import { join } from 'path';
import { loadInput } from '#loadInput';
const path = join(__dirname, 'input.txt');
console.log(path);

const btod = (b: string) => parseInt(b, 2);

const solve = async () => {
	const input = (await loadInput(path)).split('\n').map((x) => x.split(''));
	console.dir(input);

	// perform the whole thing 12 times instead of doing some let i bs
	const gamma: string[] = [];
	const epsilon: string[] = [];
	for (const [i] of input[0].entries()) {
		const { one, zero } = input.reduce(
			(acc, v) => {
				if (v[i] === '0') ++acc.zero;
				if (v[i] === '1') ++acc.one;

				return acc;
			},
			{ one: 0, zero: 0 },
		);
		console.log(`Position #${i} results: `, { one, zero });
		gamma.push(one > zero ? '1' : '0');
		epsilon.push(one > zero ? '0' : '1');
	}
	console.log(`Power Consumption: ${btod(gamma.join('')) * btod(epsilon.join(''))}`);
};
void solve();
