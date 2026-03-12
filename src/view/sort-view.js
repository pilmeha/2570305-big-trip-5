import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/utils.js';
import { SORT_TYPES } from '../const.js';

const createSortItemTemplate = (type) => `
  <div class="trip-sort__item  trip-sort__item--${type}day">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" checked>
    <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
  </div>
`;

const createSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_TYPES.map((type) => createSortItemTemplate(type)).join('')}
  </form>
`;

export default class SortView extends AbstractView{
  get template() {
    return createSortTemplate();
  }
}
