/* eslint-disable camelcase */
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DESTINATION_TYPES } from '../const.js';
import {
  createDestinationItemTemplate,
  createDestinationListTemplate,
  createDestinationSectionTemplate,
  createOffersTemplate,
  getOffersForPoint
} from '../services/services.js';

import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createFormEditPointTemplate(state, destinations, offers) {

  const destination = destinations.find((d) => d.id === state.destination);
  const offersByType = getOffersForPoint(state, offers);

  return `
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">

    <div class="event__type-wrapper">

    <label class="event__type event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17"
    src="img/icons/${state.type}.png">
    </label>

    <input class="event__type-toggle visually-hidden"
    id="event-type-toggle-1"
    type="checkbox">

    <div class="event__type-list">

    <fieldset class="event__type-group">

    ${DESTINATION_TYPES.map((type) =>
      createDestinationItemTemplate(type, state.type))
    .join('')}

    </fieldset>

    </div>

    </div>

    <div class="event__field-group event__field-group--destination">

    <label class="event__label event__type-output">
    ${state.type}
    </label>

    <input
    class="event__input event__input--destination"
    type="text"
    value="${destination ? destination.name : ''}"
    list="destination-list-1">

    <datalist id="destination-list-1">
    ${createDestinationListTemplate(destinations)}
    </datalist>

    </div>

    <div class="event__field-group event__field-group--time">

    <input
    class="event__input event__input--time"
    id="event-start-time-1"
    type="text"
    value="${dayjs(state.date_from).format('DD/MM/YY HH:mm')}">

    —

    <input
    class="event__input event__input--time"
    id="event-end-time-1"
    type="text"
    value="${dayjs(state.date_to).format('DD/MM/YY HH:mm')}">

    </div>

    <div class="event__field-group event__field-group--price">

    <label class="event__label">
    €
    </label>

    <input
    class="event__input event__input--price"
    type="number"
    value="${state.base_price}">

    </div>

    <button class="event__save-btn btn btn--blue" type="submit">
    Save
    </button>

    <button class="event__reset-btn" type="reset">
    Delete
    </button>

    <button class="event__rollup-btn" type="button"></button>

    </header>

    <section class="event__details">

    <section class="event__section event__section--offers">

    <h3 class="event__section-title">
    Offers
    </h3>

    <div class="event__available-offers">
    ${createOffersTemplate(state, offersByType)}
    </div>

    </section>

    ${createDestinationSectionTemplate(destination)}

    </section>

    </form>
  `;
}

export default class FormEditPointView extends AbstractStatefulView {

  #handleFormSubmit = null;
  #handleRollupClick = null;
  #handleDeleteClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  #offers = null;
  #destinations = null;

  constructor({point, offers, destinations, onFormSubmit, onRollupClick, onDeleteClick}) {
    super();

    this._setState(FormEditPointView.parsePointToState(point));

    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createFormEditPointTemplate(
      this._state,
      this.#destinations,
      this.#offers
    );
  }

  removeElement() {

    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }

  }

  reset(point) {
    this.updateElement(
      FormEditPointView.parsePointToState(point)
    );
  }

  _restoreHandlers() {

    this.element
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offersChangeHandler);

    this.element
    .querySelector('.event__reset-btn')
    .addEventListener('click', this.#deleteClickHandler);

    this.#setDatepicker();

  }

  #setDatepicker() {

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.date_from,
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.date_to,
        onChange: this.#dateToChangeHandler
      }
    );

  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this.#handleFormSubmit(
      FormEditPointView.parseStateToPoint(this._state)
    );

  };

  #rollupClickHandler = () => {
    this.#handleRollupClick();
  };

  #priceChangeHandler = (evt) => {

    this._setState({
      base_price: Number(evt.target.value)
    });

  };

  #typeChangeHandler = (evt) => {

    if (!evt.target.classList.contains('event__type-input')) {
      return;
    }

    this.updateElement({
      type: evt.target.value,
      offers: []
    });

  };

  #destinationChangeHandler = (evt) => {

    const destination = this.#destinations
      .find((d) => d.name === evt.target.value);

    this.updateElement({
      destination: destination ? destination.id : null
    });

  };

  #offersChangeHandler = (evt) => {

    const offerId = evt.target.value;

    let offers = [...this._state.offers];

    if (evt.target.checked) {
      offers.push(offerId);
    } else {
      offers = offers.filter((id) => id !== offerId);
    }

    this.updateElement({offers});

  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(
      FormEditPointView.parseStateToPoint(this._state)
    );
  };

  #dateFromChangeHandler = ([date]) => {
    this._setState({
      date_from: date
    });
  };

  #dateToChangeHandler = ([date]) => {
    this._setState({
      date_to: date
    });
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
