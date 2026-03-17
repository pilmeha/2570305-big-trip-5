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
      destinations: this.#destinations,
      offers: this.#offers,
    });

    render(this.#formComponent, this.#container);

    this.#formComponent.setFormSubmitHandler(this.#handleSubmit);
    this.#formComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#formComponent.setCancelClickHandler(() => this.destroy());

  }

  destroy = () => {
    if (this.#formComponent === null) {
      return;
    }

    remove(this.#formComponent);
    this.#formComponent = null;
    this.#onDestroy?.();
  };

  #handleSubmit = async (point) => {
    this.#formComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });

    try {
      await this.#onDataChange(USER_ACTION.ADD_POINT, UPDATE_TYPE.MINOR, point);
      this.destroy();
    } catch {
      this.#formComponent.shake(() => {
        this.#formComponent.updateElement({
          isDisabled: false,
          isSaving: false
        });
      });
    }
  };

  #handleDeleteClick = async (point) => {
    this.#formComponent.updateElement({
      isDisabled: true,
      isDeleting: true
    });

    try {
      await this.#onDataChange(USER_ACTION.DELETE_POINT, UPDATE_TYPE.MINOR, point);
      this.destroy();
    } catch {
      this.#formComponent.shake(() => {
        this.#formComponent.updateElement({
          isDisabled: false,
          isDeleting: false
        });
      });
    }
  };
}
