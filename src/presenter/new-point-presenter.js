import { UPDATE_TYPE, USER_ACTION } from '../const';
import { render, remove } from '../framework/render';
import FormEditPointView from '../view/form-edit-point-view';

export default class NewPointPresenter {
  #container = null;
  #destinations = null;
  #offers = null;

  #onDataChange = null;
  #onDestroy = null;

  #formComponent = null;

  constructor({container, destinations, offers, onDataChange, onDestroy}) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init(point) {
    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new FormEditPointView({
      point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleSubmit,
      onDeleteClick: this.#handleCancel,
      onRollupClick: this.#handleCancel
    });

    render(this.#formComponent, this.#container, 'afterbegin');

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }

    remove(this.#formComponent);
    this.#formComponent = null;

    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#onDestroy();
  }

  #handleSubmit = (point) => {
    this.#onDataChange(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      point
    );

    this.destroy();
  };

  #handleCancel = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
