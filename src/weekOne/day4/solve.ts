// https://adventofcode.com/2021/day/4
import { join } from 'path';
import { loadInput } from '#loadInput';
const path = join(__dirname, 'input.txt');
console.log(path);

type Row = number[];
type Board = Row[];

const chunk = <T>(a: T[], size: number) =>
	Array.from(new Array(Math.ceil(a.length / size)), (_, i) => a.slice(i * size, i * size + size));

const calledNumbers: number[] = [];

const didBoardWin = (board: Board, called = calledNumbers) => {
	// check hoz
	for (const row of board) {
		// won!
		if (row.every((n) => called.includes(n))) return 'hoz';
	}

	// check vert
	for (const [i] of board.entries()) {
		const vertNumbers = board.map((r) => r[i]);
		if (vertNumbers.every((n) => called.includes(n))) return 'vert';
	}

	return false;
};

let firstWonDetermined = false;
let lastWon: number | undefined;

const solve = async () => {
	const input = await loadInput(path);
	const rawNumbers = input.split('\n')[0];
	const numbers = rawNumbers.split(',').map(Number);
	console.log(numbers);
	const boards = chunk(
		input
			.replace(rawNumbers, '')
			.split('\n')
			.filter((x) => x),
		5,
	).map((b) =>
		b.map((r) =>
			r
				.split(' ')
				.filter((x) => x)
				.map(Number),
		),
	);

	for (const number of numbers) {
		calledNumbers.push(number);

		// part 1: first board to win
		for (const [i, board] of boards.entries()) {
			const won = didBoardWin(board);
			if (won !== false) {
				if (firstWonDetermined) break;
				console.log(`Board ${i} won: ${won}`);
				const unmarkedSum = board
					.flat()
					.filter((n) => !calledNumbers.includes(n))
					.reduce((acc, v) => (acc += v), 0);
				console.log(`unmarkedSum: ${unmarkedSum}; numCalled: ${number}; score: ${unmarkedSum * number}`);
				firstWonDetermined = true;
				break;
			}
		}

		// part 2: last board to win
		if (typeof lastWon === 'number') {
			const board = boards[lastWon];
			const hasLastWon = didBoardWin(board);
			if (hasLastWon !== false) {
				console.log(`last board won! ${hasLastWon}`);
				const unmarkedSum = board
					.flat()
					.filter((n) => !calledNumbers.includes(n))
					.reduce((acc, v) => (acc += v), 0);

				return console.log(`unmarkedSum: ${unmarkedSum}; numCalled: ${number}; score: ${unmarkedSum * number}`);
			}
		} else {
			const wonBoards = boards.map((b) => didBoardWin(b, calledNumbers));
			const notWonBoards = wonBoards.filter((b) => b === false);
			if (notWonBoards.length === 1) {
				const lastWonIndex = wonBoards.findIndex((v) => v === false);
				console.log(`Board ${lastWonIndex} will be the last to win!`);
				lastWon = lastWonIndex;
			}
		}
	}
};
void solve();
