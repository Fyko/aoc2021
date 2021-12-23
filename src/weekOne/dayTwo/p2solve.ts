import { join } from 'path';
import { loadInput } from '#loadInput';
const path = join(__dirname, 'input.txt');
console.log(path);

enum Directions {
	Forward = 'forward',
	Down = 'down',
	Up = 'up',
}

const solve = async () => {
	const input: [Directions, number][] = (await loadInput(path))
		.split('\n')
		.map((x) => x.split(' '))
		.map(([dir, val]) => [dir as Directions, parseInt(val, 10)]);

	console.dir(input);
	const { depth, distance } = input.reduce(
		(acc, [dir, val]) => {
			if (dir === Directions.Down) acc.aim += val;
			if (dir === Directions.Up) acc.aim -= val;
			if (dir === Directions.Forward) {
				acc.distance += val;
				acc.depth += acc.aim * val;
			}

			return acc;
		},
		{ depth: 0, distance: 0, aim: 0 } as Record<'depth' | 'distance' | 'aim', number>,
	);

	console.log(depth * distance);
};
void solve();
