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
      onRollupClick: this.#handleCancel,
      onDeleteClick: this.#handleDelete
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

    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#onDestroy();
  }

  #handleSubmit = async (point) => {
    this.#formComponent.setSaving();

    try {
      await this.#onDataChange(
        USER_ACTION.ADD_POINT,
        UPDATE_TYPE.MINOR,
        point
      );

      this.destroy();
    } catch {
      this.#formComponent.setAborting();
    }
  };

  #handleDelete = async (point) => {
    this.#formComponent.setDeleting();

    try {
      await this.#onDataChange(
        USER_ACTION.DELETE_POINT,
        UPDATE_TYPE.MINOR,
        point
      );

      this.destroy();
    } catch {
      this.#formComponent.setAborting();
    }
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
