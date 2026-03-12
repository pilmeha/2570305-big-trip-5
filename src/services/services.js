import { capitalizeFirstLetter } from '../utils/utils';

export const createDestinationItemTemplate = (type, currentType) => `
  <div class="event__type-item">
    <input
      id="event-type-${type}-1"
      class="event__type-input
      visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
      ${type === currentType ? 'checked' : ''}
    >
    <label
      class="event__type-label  event__type-label--${type}"
      for="event-type-${type}-1"
    >
      ${capitalizeFirstLetter(type)}
    </label>
  </div>
`;

export const createOffersItemTemplate = (offer, isChecked) => `
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-${offer.id}"
      type="checkbox"
      name="event-offer-${offer.id}"
      value="${offer.id}"
      ${isChecked ? 'checked' : ''}
    >
    <label
      class="event__offer-label"
      for="event-offer-${offer.id}"
    >
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>
`;

export const createPictureForDestinationTemplate = (picture) => `
  <img
    class="event__photo"
    src="${picture.src}"
    alt="${picture.description}"
  >
`;

export const getOffersForPoint = (state, offers) => {
  const offersByType = offers.find((item) => item.type === state.type);

  if (!offersByType) {
    return [];
  }

  return offersByType.offers;
};

export const createOffersTemplate = (point, offersList) => {
  if (!offersList.length) {
    return '';
  }

  return offersList
    .map((offer) =>
      createOffersItemTemplate(
        offer,
        point.offers.includes(offer.id),
      )
    )
    .join('');
};

export const createPicturesTemplate = (destination) => {
  if (!destination || !destination.pictures || !destination.pictures.length) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(createPictureForDestinationTemplate).join('')}
      </div>
    </div>
  `;
};

export const createDestinationListTemplate = (destinations) =>
  destinations
    .map(
      (destination) =>
        `<option value="${destination.name}"></option>`
    )
    .join('');

export const createDestinationSectionTemplate = (destination) => {
  if (!destination) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        ${destination.description}
      </p>
      ${createPicturesTemplate(destination)}
    </section>
  `;
};
