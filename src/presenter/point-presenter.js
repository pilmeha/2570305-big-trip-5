import {render, replace} from '../framework/render.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #container = null;
  #pointComponent = null;
  #editComponent = null;

  constructor(container) {
    this.#container = container;
  }

  init() {
    this.#pointComponent = new PointView({
      onEditClick: this.#handleEditClick
    });

    this.#editComponent = new FormEditPointView({
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick
    });

    render(this.#pointComponent, this.#container);
  }

  #handleEditClick = () => {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escHandler);
  };

  #handleFormSubmit = () => {
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
    document.removeEventListener('keydown', this.#escHandler);
  };
}
