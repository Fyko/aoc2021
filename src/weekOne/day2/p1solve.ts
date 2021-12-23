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
			if (dir === Directions.Forward) acc.distance += val;
			if (dir === Directions.Down) acc.depth += val;
			if (dir === Directions.Up) acc.depth -= val;

			return acc;
		},
		{ depth: 0, distance: 0 } as { depth: number; distance: number },
	);

	console.log(depth * distance);
};
void solve();
