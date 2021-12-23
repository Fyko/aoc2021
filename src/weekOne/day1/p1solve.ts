import { join } from 'path';
import { loadInput } from '#loadInput';
const path = join(__dirname, 'input.txt');
console.log(path);

const solve = async () => {
	const input = (await loadInput(path)).split('\n').map(Number);
	console.dir(input);
	const reduce = input.reduce((acc, v) => {
		if (!acc.prev) {
			Reflect.set(acc, 'prev', v);
			Reflect.set(acc, 'total', 0);
			return acc;
		}

		if (v > acc.prev) {
			Reflect.set(acc, 'total', acc.total + 1);
		}
		Reflect.set(acc, 'prev', v);

		return acc;
	}, {} as { prev: number; total: number });

	console.log(reduce);
};
void solve();
