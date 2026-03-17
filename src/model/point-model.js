import { UPDATE_TYPE } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  setPoints(points) {
    this.#points = [...points];
    this._notify(UPDATE_TYPE.MAJOR);
  }

  async updatePoint(updateType, updatedPoint) {
    try {
      const updated = await this.#pointsApiService.updatePoint(updatedPoint);
      const index = this.#points.findIndex(
        (point) => point.id === updated.id
      );

      if (index === -1) {
        return;
      }

      this.#points = [
        ...this.points.slice(0, index),
        updated,
        ...this.points.slice(index + 1)
      ];

      this._notify(updateType, updated);
    } catch (err) {
      throw new Error('Cannot update point');
    }
  }

  async addPoint(updateType, newPoint) {
    try {
      const created = await this.#pointsApiService.addPoint(newPoint);
      this.#points = [created, ...this.#points];
      this._notify(updateType, created);
    } catch (err) {
      throw new Error('Cannot add point');
    }
  }

  async deletePoint(updateType, pointToDelete) {
    try {
      await this.#pointsApiService.deletePoint(pointToDelete);
      this.#points = this.#points.filter(
        (point) => point.id !== pointToDelete.id
      );
      this._notify(updateType, pointToDelete);
    } catch {
      throw new Error('Cannot delete point');
    }

  }
}
