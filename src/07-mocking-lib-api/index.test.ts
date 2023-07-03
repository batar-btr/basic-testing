// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  let getSpy: jest.SpyInstance;

  const resolvedValue = {
    data: 'testing data',
  };

  const relativePath = './relativePath';

  beforeEach(() => {
    getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue(resolvedValue);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    getSpy.mockRestore();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    axiosCreateSpy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(getSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(result).toBe(resolvedValue.data);
  });
});
