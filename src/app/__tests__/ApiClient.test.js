import axios from 'axios';
import ApiClient from '../../../ApiClient/client';

jest.mock('axios');

describe('ApiClient', () => {
  test('getWeatherByCity returns weather data on success', async () => {
    const apiClient = new ApiClient();

    const mockResponse = {
      status: 200,
      data: { some: 'data' }
    };

    axios.get.mockResolvedValue(mockResponse);
    const result = await apiClient.getWeatherByCity({ latitude: 51.5074, longitude: -0.1278 });
    expect(result).toEqual(mockResponse);
  });

  test('getWeatherByCity throws error on failed response', async () => {
    const apiClient = new ApiClient();
    axios.get.mockRejectedValue(new Error('No weather data found'));
    await expect(apiClient.getWeatherByCity({ latitude: 0, longitude: 0 })).rejects.toThrow('No weather data found');
  });
});
