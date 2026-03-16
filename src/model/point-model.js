import Observable from '../framework/observable.js';
import { pointsMocks } from '../mock/points-mock';

export default class PointModel extends Observable {
  #points = pointsMocks;

  get points() {
    return this.#points;
  }

  updatePoint(updatedPoint) {
    const index = this.#points.findIndex(
      (point) => point.id === updatedPoint.id
    );

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
