import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';

import { render } from '../framework/render.js';
import EmptyList from '../view/empty-view.js';
import PointPresenter from './point-presenter.js';

import ContentView from '../view/content-view.js';

export default class BoardPresenter {
  #eventListComponent = new ContentView();
  #boardContainer = null;
  #filterContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;

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
      const pointPresenter = new PointPresenter({
        container: this.#boardContainer,
        point,
        destinations: this.#destinationModel.destinations,
        offers: this.#offersModel.offers
      });

      pointPresenter.init();
    });
  }
}
