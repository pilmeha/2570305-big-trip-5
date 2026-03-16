import { replace, remove, render } from '../framework/render';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;

  #filterComponent = null;

  constructor({container, pointsModel, filterModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prev = this.#filterComponent;

    this.#filterComponent = new FilterView({
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#handleFilterChange
    });

    if (prev === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prev);
    remove(prev);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    this.#filterModel.setFilter(filterType);
  };
}
