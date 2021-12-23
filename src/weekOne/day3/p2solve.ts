import { join } from 'path';
import { loadInput } from '#loadInput';
const path = join(__dirname, 'input.txt');
console.log(path);

const btod = (b: string) => parseInt(b, 2);

const calcMostCommonBit = (input: string[][], pos: number): Record<'one' | 'zero', number> =>
	input.reduce(
		(acc, v) => {
			if (v[pos] === '0') ++acc.zero;
			if (v[pos] === '1') ++acc.one;

			return acc;
		},
		{ one: 0, zero: 0 },
	);

const filter = (input: string[][], pos = 0, inverse = false): string[][] => {
	const { one, zero } = calcMostCommonBit(input, pos);

	const o2MostCommon = one === zero ? '1' : one > zero ? '1' : '0';
	const co2MostCommon = one === zero ? '0' : one < zero ? '1' : '0';
	const mostCommon = inverse ? co2MostCommon : o2MostCommon;

	const filtered = input.filter((xs) => xs[pos] === mostCommon);

	if (filtered.length === 1) return filtered;
	return pos - 1 === 12 ? filtered : filter(filtered, pos + 1, inverse);
};

const solve = async () => {
	const input = (await loadInput(path)).split('\n').map((x) => x.split(''));

	const ogen = filter(input).map((f) => btod(f.join('')));
	console.table({ ogen });

	const co2scrub = filter(input, undefined, true).map((f) => btod(f.join('')));
	console.table({ co2scrub });

	console.log(`Life Support Rating: ${ogen[0] * co2scrub[0]}`);
};
void solve();
