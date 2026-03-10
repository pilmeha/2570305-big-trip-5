import { offersMocks } from '../mock/offers-mock';

export default class OffersModel {
  #offers = offersMocks;

  // constructor(service) {
  //   this.#service = service;
  //   this.#offers = this.#service.getOffers();
  // }

  get offers() {
    return this.#offers;
  }

  // getByType(type) {
  //   return this.#offers
  //     .find((offer) => offer.type === type).offers;
  // }

}
