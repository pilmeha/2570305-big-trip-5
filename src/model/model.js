import { POINT_COUNT } from '../const';
import { getRandomPoint } from '../mock/points-mock';
import { desctinationsMocks } from '../mock/destinations-mock';
import { offersMocks } from '../mock/offers-mock';


export default class PointModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);
  destinations = desctinationsMocks;
  offers = offersMocks;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestinationById(id) {
    return this.destinations.find((item) => item.id === id);
  }

  getOffersByType(type) {
    return this.offers.find((item) => item.type === type);
  }

  getOffersById(type, itemsId) {
    return this.getOffersByType(type)
      .offers.fillter((item) => itemsId.find((id) => item.id === id));
  }
}
