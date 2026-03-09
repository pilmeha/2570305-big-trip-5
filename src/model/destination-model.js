import { destinationsMocks } from '../mock/destinations-mock';

export default class DestinationModel {
  #destinations = destinationsMocks;

  get destinations() {
    return this.#destinations;
  }
}
