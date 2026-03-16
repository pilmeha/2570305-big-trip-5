/* eslint-disable camelcase */
import SortView from '../view/sort-view.js';

import {render, remove} from '../framework/render.js';

import EmptyList from '../view/empty-view.js';
import PointPresenter from './point-presenter.js';
import ContentView from '../view/content-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {POINT_COUNT} from '../const.js';

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

  #newPointButton = document.querySelector('.trip-main__event-add-btn');

  #emptyListComponent = null;

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
    this.#newPointButton.addEventListener(
      'click',
      this.#handleNewPointClick
    );
  }

  get points() {
    const points = this.#pointsModel.points;
    const filter = this.#filterModel.filter;

    switch (filter) {
      case 'future':
        return points.filter(filterPointFuture);

      case 'present':
        return points.filter(filterPointPresent);

      case 'past':
        return points.filter(filterPointPast);
    }

    return points;
  }

  init() {
    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    this.#renderBoard();
  }

  #handleModelEvent = () => {
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderBoard() {

    const points = this.points;

    if (!points.length) {

      this.#emptyListComponent = new EmptyList();

      render(this.#emptyListComponent, this.#boardContainer);

      return;
    }

    const pointsToRender = points.slice(0, this.#renderedPointCount);

    pointsToRender.forEach((point) => this.#renderPoint(point));

    if (points.length > this.#renderedPointCount) {
      this.#renderShowMoreButton();
    }

  }

  #clearBoard() {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
      this.#emptyListComponent = null;
    }

    if (this.#showMoreButtonComponent) {
      remove(this.#showMoreButtonComponent);
    }

    this.#renderedPointCount = POINT_COUNT;
  }

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView();

    this.#showMoreButtonComponent.setClickHandler(
      this.#handleShowMoreClick
    );

    render(this.#showMoreButtonComponent, this.#boardContainer);
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

  #handleNewPointClick = () => {
    const newPoint = {
      id: Date.now().toString(),
      type: 'taxi',
      destination: null,
      date_from: new Date(),
      date_to: new Date(),
      base_price: 0,
      offers: [],
      is_favorite: false
    };

    this.#pointsModel.addPoint(newPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (actionType, update) => {
    switch (actionType) {
      case 'UPDATE_POINT':
        this.#pointsModel.updatePoint(update);
        break;

      case 'DELETE_POINT':
        this.#pointsModel.deletePoint(update);
        break;

      case 'ADD_POINT':
        this.#pointsModel.addPoint(update);
        break;
    }
  };
}
