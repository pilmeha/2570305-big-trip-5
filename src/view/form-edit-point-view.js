/* eslint-disable camelcase */
import AbstarctStatefulView from '../framework/view/abstract-stateful-view.js';
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
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${state.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${DESTINATION_TYPES.map((type) => createDestinationItemTemplate(type)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${state.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestinationListTemplate(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(state.date_from).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(state.to).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${state.base_price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOffersTemplate(state, offers)}
          </div>
        </section>
          ${createDestinationSectionTemplate(destination)}
      </section>
    </form>
  `;
}

export default class FormEditPointView extends AbstarctStatefulView {
  #handleFormSubmit = null;
  #handleRollupClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  // #point = null;
  // #destination = null;
  #offers = null;
  #destinations = null;

  constructor({point, offers, destinations, onFormSubmit, onRollupClick}) {
    super();

    this._setState(FormEditPointView.parsePointToState(point));

    // this.#destination = destination;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;

    this._restoreHandlers();
  }

  get template() {
    return createFormEditPointTemplate(this._state, this.#destinations, this.#offers);
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
    this.updateElement(FormEditPointView.parsePointToState(point));
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

    // this.element
    //   .querySelector('.event--edit')
    //   .addEventListener('submit', this.#formSubmitHandler);

    // const offersContainer = this.element.querySelector('.event__available-offers');
    // if (offersContainer) {
    //   offersContainer.addEventListener('change', this.#offersChangeHandler);
    // }

    this.#setDatepicker();
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
    const offersByType = this.#offers
      .find((item) => item.type === evt.target.value);

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
    const offerId = evt.target.id.replace('event-offer-', '');

    const offers = this._state.offers.includes(offerId)
      ? this._state.offers.filter((id) => id !== offerId)
      : [...this._state.offers, offerId];

    this._setState({offers});
  };

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enable: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.date_from,
        onChange: this.#dateFromChangeHandler,
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enable: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.date_to,
        onChange: this.#dateToChangeHandler,
      }
    );
  }

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
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
