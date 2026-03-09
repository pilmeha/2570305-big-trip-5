import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';

import {render, RenderPosition} from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #filterContainer = null;

  constructor({boardContainer, filterContainer}) {
    this.#boardContainer = boardContainer;
    this.#filterContainer = filterContainer;
  }

  init() {
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#boardContainer);
    for (let i = 0; i < 3; i++) {
      render(
        new PointView({onEditClick: () => {}}),
        this.#boardContainer,
        RenderPosition.BEFOREEND);
    }
  }
}
