import Observable from '../framework/observable.js';

export default class DestinationModel extends Observable {
  #destinations = [];

  get destinations() {
    return this.#destinations;
  }

  setDestinations(destinations) {
    this.#destinations = [...destinations];
    this._notify();
  }

  getById(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }

}
