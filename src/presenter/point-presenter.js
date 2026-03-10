import {render, replace} from '../framework/render.js';
import FormEditPointView from '../view/form-edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #container = null;
  #point = null;
  #destinations = null;
  #offers = null;

  #pointComponent = null;
  #editComponent = null;

  constructor({container, point, destinations, offers}) {
    this.#container = container;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    const destination = this.#destinations.find(
      (dest) => dest.id === this.#point.destination
    );

    this.#pointComponent = new PointView({
      point: this.#point,
      destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick
    });

    this.#editComponent = new FormEditPointView({
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
      point: this.#point,
      destination: destination,
      offers: this.#offers,
      destinations: this.#destinations
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
