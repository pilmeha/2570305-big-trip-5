import { pointsMocks } from '../mock/points-mock';

export default class PointModel {
  #points = pointsMocks;

  get points() {
    return this.#points;
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );
  }
}
