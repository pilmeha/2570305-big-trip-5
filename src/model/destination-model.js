import { destinationsMocks } from '../mock/destinations-mock';

export default class DestinationModel {
  #destinations = destinationsMocks;

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }

}
