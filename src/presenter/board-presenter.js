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

  #pointPresenters = new Map();

  constructor({boardContainer, filterContainer, pointsModel, destinationModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#pointsModel.points;
  }

  init() {
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    if (!this.points.length) {
      render(new EmptyList(), this.#boardContainer);
      return;
    }

    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#eventListComponent.element,
      destinations: this.#destinationModel.destinations,
      offers: this.#offersModel.offers,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handlePointChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);

    this.#pointPresenters
      .get(updatedPoint.id)
      .init(updatedPoint);
  };
}
