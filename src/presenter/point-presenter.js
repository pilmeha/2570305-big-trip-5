/* eslint-disable camelcase */
import { render, replace, remove } from '../framework/render.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #container = null;
  #handleModeChange = null;

  #point = null;
  #destinations = null;
  #offers = null;

  #pointComponent = null;
  #editComponent = null;

  #mode = MODE.DEFAULT;

  constructor({ container, onModeChange, destinations, offers }) {
    this.#container = container;
    this.#handleModeChange = onModeChange;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    const destination = this.#destinations.getById(this.#point.destination);

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editComponent = new FormEditPointView({
      point: this.#point,
      destination: destination,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick
    });

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#editComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #replacePointToForm() {
    replace(this.#editComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editComponent);
    this.#mode = MODE.DEFAULT;
  }

  #escHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escHandler);
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escHandler);
  };

  #handleRollupClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escHandler);
  };

  #handleFavoriteClick = () => {
    this.#point = {
      ...this.#point,
      is_favorite: !this.#point.is_favorite
    };

    this.init(this.#point);
  };
}
