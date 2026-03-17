import Observable from '../framework/observable.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      console.log(points);
    });
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, updatedPoint) {
    if (!updatedPoint || !updatedPoint.id) {
      return;
    }

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

    this._notify(updateType, updatedPoint);
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
