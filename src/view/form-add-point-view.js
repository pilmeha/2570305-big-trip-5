/* eslint-disable indent */
import AbstractView from '../framework/view/abstract-view.js';
import { DESTINATION_TYPES } from '../const.js';
import { createDestinationItemTemplate, createDestinationListTemplate, createDestinationSectionTemplate, createOffersItemTemplate } from '../services/services.js';

const createFormAddPointTemplate = (point, destination, offers, destinations) => `
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <img
          class="event__type-icon"
          width="17"
          height="17"
          src="img/icons/${point.type}.png"
          alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${DESTINATION_TYPES.map(
              (type) => createDestinationItemTemplate(type, point.type)
            ).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>

        <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${destination ? destination.name : ''}"
        list="destination-list-1">

        <datalist id="destination-list-1">
          ${createDestinationListTemplate(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <input
        class="event__input  event__input--time"
        id="event-start-time-1"
        type="text"
        name="event-start-time">

        &mdash;

        <input
        class="event__input  event__input--time"
        id="event-end-time-1"
        type="text"
        name="event-end-time">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
        class="event__input  event__input--price"
        id="event-price-1"
        type="text"
        name="event-price"
        value="${point.base_price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersItemTemplate(point, offers)};
        </div>
      </section>
      ${createDestinationSectionTemplate(destination)}
    </section>
  </form>
`;

export default class FormAddPointView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #destinations = null;

  #submitHandler = null;
  #cancelHandler = null;

  constructor({point, destination, offers, destinations}) {
    super();

    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#destinations = destinations;

    this.element
      .addEventListener('submit', this.#submitHandlerInternal);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#cancelHandlerInternal);
  }

  get template() {
    return createFormAddPointTemplate(
      this.#point,
      this.#destination,
      this.#offers,
      this.#destinations);
  }

  setSubmitHandler(callback) {
    this.#submitHandler = callback;
  }

  setCancelHandler(callback) {
    this.#cancelHandler = callback;
  }

  #submitHandlerInternal = (evt) => {
    evt.preventDefault();

    if (this.#submitHandler) {
      this.#submitHandler(this.#point);
    }
  };

  #cancelHandlerInternal = (evt) => {
    evt.preventDefault();

    if (this.#cancelHandler) {
      this.#cancelHandler();
    }
  };
}
