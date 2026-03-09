import PointModel from './model/model.js';
import BoardPresenter from './presenter/board-presenter.js';


const filtersElement = document.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.trip-events');

const pointsModel = new PointModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripElement,
  filterContainer: filtersElement,
  pointsModel: pointsModel
});

boardPresenter.init();
