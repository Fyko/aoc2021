import { join } from 'path';
import { loadInput } from '#loadInput';
const path = join(__dirname, 'input.txt');
console.log(path);

const solve = async () => {
	const input = (await loadInput(path)).split('\n').map(Number);
	console.dir(input);
	const reduce = input.reduce((acc, _, i, arr) => {
		const numbers = arr.slice(i, i + 3);
		const sum = numbers.reduce((acc, v) => (acc += v), 0);
		if (!acc.previousSum) {
			Reflect.set(acc, 'previousSum', sum);
			Reflect.set(acc, 'total', 0);
			return acc;
		}

		if (sum > acc.previousSum) {
			Reflect.set(acc, 'total', acc.total + 1);
		}
		Reflect.set(acc, 'previousSum', sum);

		return acc;
	}, {} as { previousSum: number; total: number });

	console.log(reduce);
};
void solve();
