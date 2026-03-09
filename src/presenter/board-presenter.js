// import SortView from '../view/sort-view.js';
// import FilterView from '../view/filter-view.js';
// import ContentView from '../view/content-view.js';

// import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
// import { container } from 'webpack';

export default class BoardPresenter {
  #boardContainer = null;
  // #filterContainer = null;
  #pointsModel = null;
  #destinationModel = null;
  #offersModel = null;
  // #eventListPoints = [];


  constructor({boardContainer, pointsModel, destinationModel, offersModel}) {
    this.#boardContainer = boardContainer;
    // this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  init() {
    const points = this.#pointsModel.points;

    points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: this.#boardContainer,
        point,
        destination: this.#destinationModel.destinations,
        offers: this.#offersModel.offers
      });

      pointPresenter.init();
    });
    // render(new SortView(), this.#boardContainer);
    // render(new FilterView(), this.#filterContainer);

    // const contentComponent = new ContentView();
    // render(contentComponent, this.#boardContainer);

    // this.#eventListPoints = [...this.#pointsModel.getPoints()];

    // for (let i = 0; i < this.#eventListPoints.length; i++) {
    //   const pointPresenter = new PointPresenter(contentComponent.element);
    //   pointPresenter.init();
    // }
  }
}
