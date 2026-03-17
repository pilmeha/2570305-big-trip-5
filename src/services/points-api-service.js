import ApiService from '../framework/api-service.js';
import { METHOD_TYPE } from '../const.js';
import PointAdapter from './point-adapter.js';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse)
      .then((points) =>
        points.map(PointAdapter.adaptToClient)
      );
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: METHOD_TYPE.PUT,
      body: JSON.stringify(PointAdapter.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return PointAdapter.adaptToClient(parsedResponse);
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: METHOD_TYPE.DELETE,
    });
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: METHOD_TYPE.POST,
      body: JSON.stringify(PointAdapter.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return PointAdapter.adaptToClient(parsedResponse);
  }
}
