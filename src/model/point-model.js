import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points;
    } catch (err) {
      this.#points = [];
    }

    this._notify();
  }

  get points() {
    return this.#points;
  }

  setPoints(points) {
    this.#points = [...points];
    this._notify();
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

  addPoint(updateType, newPoint) {
    this.#points = [newPoint, ...this.#points];

    this._notify(updateType, newPoint);
  }

  deletePoint(updateType, pointToDelete) {
    if (!pointToDelete || !pointToDelete.id) {
      return;
    }

    this.#points = this.#points.filter(
      (point) => point.id !== pointToDelete.id
    );

    this._notify(updateType);
  }
}
