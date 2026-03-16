import AbstractView from '../framework/view/abstract-view.js';

function createShowMoreButtonTemplate() {
  return `
    <button class="trip-events__load-more btn btn--big btn--yellow">
      Show more
    </button>
  `;
}

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(callback) {
    this.element.addEventListener('click', callback);
  }
}
