import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/utils.js';
import { FILTER_TYPES } from '../const.js';

const createFilterItemTemplate = (type) => `
  <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}">
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${capitalizeFirstLetter(type)}
      </label>
    </div>
`;

const createFilterTemplate = () => `
  <form class="trip-filters" action="#" method="get">
    ${FILTER_TYPES.map((type) => createFilterItemTemplate(type)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class FilterView extends AbstractView {

  #handleFilterChange = null;

  constructor({currentFilter, onFilterChange}) {
    super();
    this.#handleFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate();
  }

  #filterChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-filters__filter-input')) {
      return;
    }

    this.#handleFilterChange(evt.target.value);
  };
}
