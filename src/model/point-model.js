import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #points = [];

  get points() {
    return this.#points;
  }

  setPoints(points) {
    this.#points = [...points];
    this._notify();
  }

  updatePoint(updatedPoint) {
    const index = this.#points.findIndex(
      (point) => point.id === updatedPoint.id
    );

    if (index === -1) {
      return;
    }

    this.#points = [
      ...this.points.slice(0, index),
      updatedPoint,
      ...this.points.slice(index + 1)
    ];

    this._notify();
  }

  addPoint(newPoint) {
    this.#points = [newPoint, ...this.#points];

    this._notify();
  }

  deletePoint(pointToDelete) {
    this.#points = this.#points.filter(
      (point) => point.id !== pointToDelete.id
    );

    this._notify();
  }
}
