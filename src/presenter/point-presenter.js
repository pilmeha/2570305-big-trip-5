/* eslint-disable camelcase */

import {render, replace, remove} from '../framework/render.js';

import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {

  #container = null;

  #point = null;

  #destinations = null;
  #offers = null;

  #destination = null;

  #pointComponent = null;
  #editComponent = null;

  #mode = MODE.DEFAULT;

  #handleModeChange = null;
  #handleDataChange = null;

  constructor({container, destinations, offers, onModeChange, onDataChange}) {

    this.#container = container;

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
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (!prevPointComponent || !prevEditComponent) {

      render(this.#pointComponent, this.#container);

      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    } else {
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
      this.#editComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escHandler);
  }

  #replaceFormToPoint = () => {
    this.#mode = MODE.DEFAULT;
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escHandler);
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (updatedPoint) => {
    this.#handleDataChange('UPDATE_POINT', updatedPoint);
    this.#replaceFormToPoint();
  };

  #handleRollupClick = () => {
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange('DELETE_POINT', point);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      'UPDATE_POINT',
      {
        ...this.#point,
        is_favorite: !this.#point.is_favorite
      }
    );
  };

  #escHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

}
