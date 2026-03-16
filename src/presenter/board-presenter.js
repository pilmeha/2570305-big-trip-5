import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';

import {render, remove} from '../framework/render.js';

import EmptyList from '../view/empty-view.js';
import PointPresenter from './point-presenter.js';
import ContentView from '../view/content-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {FILTER_TYPES, POINT_COUNT} from '../const.js';

import {
  filterPointFuture,
  filterPointPresent,
  filterPointPast
} from '../utils/filter.js';

export default class BoardPresenter {

  #boardContainer = null;
  #filterContainer = null;

  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #filterModel = null;

  #eventListComponent = new ContentView();

  #pointPresenters = new Map();

  #renderedPointCount = POINT_COUNT;

  #showMoreButtonComponent = null;


  constructor({
    boardContainer,
    filterContainer,
    pointsModel,
    destinationModel,
    offersModel,
    filterModel
  }) {
    this.#boardContainer = boardContainer;
    this.#filterContainer = filterContainer;

    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points;
    const filterType = this.#filterModel.filter;

    switch (filterType) {
      case FILTER_TYPES[1]:
        return points.filter(filterPointFuture);

      case FILTER_TYPES[2]:
        return points.filter(filterPointPresent);

      case FILTER_TYPES[3]:
        return points.filter(filterPointPast);
    }

    return points;
  }

  init() {

    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    if (!this.points.length) {
      render(new EmptyList(), this.#boardContainer);
      return;
    }

    this.#renderBoard();
  }

  #handleModelEvent = () => {
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderBoard() {
    const points = this.points.slice(0, this.#renderedPointCount);

    points.forEach((point) => this.#renderPoint(point));

    if (this.points.length > this.#renderedPointCount) {
      this.#renderShowMoreButton();
    }
  }

  #clearBoard() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());

    this.#pointPresenters.clear();

    this.#renderedPointCount = POINT_COUNT;

    if (this.#showMoreButtonComponent) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView();

    this.#showMoreButtonComponent.setClickHandler(
      this.#handleShowMoreClick
    );

    render(this.#showMoreButtonComponent, this.#eventListComponent.element);
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

  #handleShowMoreClick = () => {
    const pointCount = this.points.length;

    const newRenderPointCount =
      Math.min(pointCount, this.#renderedPointCount + POINT_COUNT);

    const points = this.points.slice(
      this.#renderedPointCount,
      newRenderPointCount
    );

    points.forEach((point) => this.#renderPoint(point));

    this.#renderedPointCount = newRenderPointCount;

    if (this.#renderedPointCount >= pointCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);
  };
}
