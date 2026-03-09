import { pointsMocks } from '../mock/points-mock';

export default class PointModel {
  #points = pointsMocks;

  get points() {
    return this.#points;
  }
}
