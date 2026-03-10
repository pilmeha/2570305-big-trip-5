import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';

import { render } from '../framework/render.js';
import EmptyList from '../view/empty-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;

  #pointPresenters = new Map();

  constructor({boardContainer, filterContainer, pointsModel, destinationModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  init() {
    const points = this.#pointsModel.points;

    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#boardContainer);

    if (!points.length) {
      render(new EmptyList(), this.#boardContainer);
      return;
    }

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#boardContainer,
      onModeChange: this.#handleModeChange,
      point,
      destinations: this.#destinationModel.destinations,
      offers: this.#offersModel.offers,
    });

    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
