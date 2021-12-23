import { readFile } from 'fs/promises';

export const loadInput = async (path: string) => (await readFile(path)).toString('ascii');
