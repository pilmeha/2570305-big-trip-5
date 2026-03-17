import { offersMocks } from '../mock/offers-mock';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = offersMocks;

  get offers() {
    return this.#offers;
  }

  setOffers(offers) {
    this.#offers = [...offers];
    this._notify();
  }
}
