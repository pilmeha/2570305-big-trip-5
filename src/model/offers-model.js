import { offersMocks } from '../mock/offers-mock';

export default class OffersModel {
  #offers = offersMocks;

  get offers() {
    return this.#offers;
  }

  setOffers(offers) {
    this.#offers = [...offers];
    this._notify();
  }
}
