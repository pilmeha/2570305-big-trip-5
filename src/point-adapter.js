/* eslint-disable camelcase */
export default class PointAdapter {
  static adaptToClient(point) {
    return {
      id: point.id,
      basePrice: point.base_price,
      dateFrom: new Date(point.date_from),
      dateTo: new Date(point.date_to),
      destination: point.destination,
      isFavorite: point.is_favorite,
      offers: point.offers,
      type: point.type
    };
  }

  static adaptToServer(point) {
    return {
      id: point.id,
      base_price: point.basePrice,
      date_from: point.dateFrom instanceof Date
        ? point.dateFrom.toISOString()
        : point.dateFrom,
      date_to: point.dateTo instanceof Date
        ? point.dateTo.toISOString()
        : point.dateTo,
      destination: point.destination,
      is_favorite: point.isFavorite,
      offers: point.offers,
      type: point.type
    };
  }
}
