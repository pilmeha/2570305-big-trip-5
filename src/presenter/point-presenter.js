/* eslint-disable camelcase */
import {render, replace, remove} from '../framework/render.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #container = null;
  #point = null;
  #destinations = null;
  #offers = null;

  #pointComponent = null;
  #editComponent = null;

  #destination = null;

  #handleModeChange = null;

  #handleDataChange = null;

  #mode = MODE.DEFAULT;

  constructor({container, destinations, offers, onModeChange, onDataChange}) {
    this.#container = container;
    // this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point ?? this.#point;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#destination = this.#destinations.find(
      (dest) => dest.id === this.#point.destination
    );

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editComponent = new FormEditPointView({
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
      point: this.#point,
      destination: this.#destination,
      offers: this.#offers,
      destinations: this.#destinations
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

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#editComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escHandler);
  };

  #handleFormSubmit = () => {
    this.#handleDataChange(this.#point);
    this.#replaceFormToPoint();
  };

  #handleRollupClick = () => {
    this.#replaceFormToPoint();
  };

  #escHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editComponent);
    this.#mode = MODE.DEFAULT;
    document.removeEventListener('keydown', this.#escHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#point,
      is_favorite: !this.#point.is_favorite
    });
  };
}
