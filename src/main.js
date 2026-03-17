import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './services/points-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';
import LoadingView from './view/loading-view.js';
import {remove, render} from './framework/render.js';
import EmptyList from './view/empty-view.js';

const tripElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

const init = async () => {
  const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

  const pointsModel = new PointModel({pointsApiService});
  const destinationModel = new DestinationModel();
  const offersModel = new OffersModel();
  const filterModel = new FilterModel();

  const loadingComponent = new LoadingView();
  render(loadingComponent, tripElement);

  try {
    const [points, destinations, offers] = await Promise.all([
      pointsApiService.points,
      pointsApiService.destinations,
      pointsApiService.offers
    ]);

    pointsModel.setPoints(points);
    destinationModel.setDestinations(destinations);
    offersModel.setOffers(offers);
  } catch (err) {
    render(new EmptyList(), tripElement);
    return;
  }

  remove(loadingComponent);

  const boardPresenter = new BoardPresenter({
    boardContainer: tripElement,
    pointsModel: pointsModel,
    destinationModel: destinationModel,
    offersModel: offersModel,
    filterModel: filterModel
  });

  const filterPresenter = new FilterPresenter({
    container: filtersElement,
    pointsModel,
    filterModel
  });

  filterPresenter.init();
  boardPresenter.init();
};

init();
