import { FILTER_TYPES_OBJ } from '../const.js';
import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #filter = FILTER_TYPES_OBJ[0];

  get filter() {
    return this.#filter;
  }

  setFilter(filterType) {
    this.#filter = filterType;

    this._notify();
  }
}
