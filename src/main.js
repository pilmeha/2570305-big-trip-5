import BoardPresenter from './presenter/board-presenter.js';

import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const tripElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointModel();
const destinationModel = new DestinationModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripElement,
  filterContainer: filtersElement,
  pointsModel: pointsModel,
  destinationModel: destinationModel,
  offersModel: offersModel,
  filterModel: filterModel
});

boardPresenter.init();
