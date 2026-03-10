import AbstractView from '../framework/view/abstract-view.js';
import { DESTINATION_TYPES } from '../const.js';
import {
  createDestinationItemTemplate,
  createDestinationListTemplate,
  createDestinationSectionTemplate,
  createOffersTemplate
} from '../services/services.js';

const createFormEditPointTemplate = (point, destination, offers, destinations) => `
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
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
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationListTemplate(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.base_price}">
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
          ${createOffersTemplate(point, offers)}
        </div>
      </section>
        ${createDestinationSectionTemplate(destination)}
    </section>
  </form>
`;

export default class FormEditPointView extends AbstractView {
  #handleFormSubmit = null;
  #handleRollupClick = null;

  #point = null;
  #destination = null;
  #offers = null;
  #destinations = null;

  constructor({point, destination, offers, destinations, onFormSubmit, onRollupClick}) {
    super();

    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;

    this.element
      .addEventListener('submit', this.#forSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);
  }

  get template() {
    return createFormEditPointTemplate(this.#point, this.#destination, this.#offers, this.#destinations);
  }

  #forSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #rollupClickHandler = () => {
    this.#handleRollupClick();
  };

}
