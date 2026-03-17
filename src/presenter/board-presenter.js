/* eslint-disable camelcase */
import SortView from '../view/sort-view.js';

import {render, remove} from '../framework/render.js';

import EmptyList from '../view/empty-view.js';
import PointPresenter from './point-presenter.js';
import ContentView from '../view/content-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {FILTER_TYPES, POINT_COUNT, UPDATE_TYPE, USER_ACTION} from '../const.js';

import {
  filterPointFuture,
  filterPointPresent,
  filterPointPast
} from '../utils/filter.js';

import NewPointPresenter from './new-point-presenter.js';

export default class BoardPresenter {

  #boardContainer = null;

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

  #newPointPresenter = null;

  constructor({
    boardContainer,
    pointsModel,
    destinationModel,
    offersModel,
    filterModel
  }) {
    this.#boardContainer = boardContainer;

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

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventListComponent.element,
      destinations: this.#destinationModel.destinations,
      offers: this.#offersModel.offers,
      onDataChange: this.#handlePointChange,
      onDestroy: this.#handleNewPointDestroy
    });
  }

  get points() {
    const points = this.#pointsModel.points;
    const filter = this.#filterModel.filter;

    switch (filter) {
      case FILTER_TYPES.FUTURE:
        return points.filter(filterPointFuture);

      case FILTER_TYPES.PRESENT:
        return points.filter(filterPointPresent);

      case FILTER_TYPES.PAST:
        return points.filter(filterPointPast);
    }

    return points;
  }

  init() {
    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    this.#renderBoard();
  }

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UPDATE_TYPE.PATCH:
        this.#pointPresenters.get(data.id)?.init(data);
        break;

      case UPDATE_TYPE.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;

      case UPDATE_TYPE.MAJOR:
        this.#clearBoard({resetRenderedPointCount: true});
        this.#renderBoard();
        break;
    }
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

  #clearBoard({resetRenderedPointCount = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
      this.#emptyListComponent = null;
    }

    if (this.#showMoreButtonComponent) {
      remove(this.#showMoreButtonComponent);
    }

    if (resetRenderedPointCount) {
      this.#renderedPointCount = POINT_COUNT;
    }
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
    this.#handleModeChange();

    const firsteDestination = this.#destinationModel.destinations[0];

    const newPoint = {
      type: 'taxi',
      destination: firsteDestination.id,
      dateFrom: new Date(),
      dateTo: new Date(Date.now() + 60 * 60 * 1000),
      basePrice: 100,
      offers: [],
      isFavorite: false
    };

    this.#newPointButton.disabled = true;
    this.#newPointPresenter.init(newPoint);
  };

  #handleNewPointDestroy = () => {
    this.#newPointButton.disabled = false;
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = async (actionType, updateType, update) => {
    try {
      switch (actionType) {
        case USER_ACTION.UPDATE_POINT:
          await this.#pointsModel.updatePoint(updateType, update);
          break;

        case USER_ACTION.DELETE_POINT:
          await this.#pointsModel.deletePoint(updateType, update);
          break;

        case USER_ACTION.ADD_POINT:
          await this.#pointsModel.addPoint(updateType, update);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };
}
