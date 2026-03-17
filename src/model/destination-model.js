import { destinationsMocks } from '../mock/destinations-mock';

export default class DestinationModel {
  #destinations = destinationsMocks;

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
