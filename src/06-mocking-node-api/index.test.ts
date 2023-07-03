// Uncomment the code below and write your tests
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path = require('path');
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 4000);
    jest.advanceTimersByTime(2000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    expect(callback).not.toHaveBeenCalled();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(15000);
    expect(callback).toHaveBeenCalledTimes(15);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.mock('path');

    const pathToFile = './test.txt';
    const finalPath = 'folder/directory/test.txt';

    jest.spyOn(path, 'join').mockReturnValue(finalPath);

    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
    jest.restoreAllMocks();
  });

  test('should return null if file does not exist', async () => {
    const pathToNotExistFile = './notExistFile.txt';
    const file = await readFileAsynchronously(pathToNotExistFile);
    expect(file).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.resetModules();

    const file = await readFile(path.join(__dirname, 'index.ts'));

    const fileFromFunc = await readFileAsynchronously('index.ts');

    expect(file.toString()).toEqual(fileFromFunc);
  });
});
