import dayjs from 'dayjs';

export const filterPointFuture = (point) =>
  dayjs(point.date_from).isAfter(dayjs());

export const filterPointPresent = (point) =>
  dayjs(point.date_from).isBefore(dayjs()) &&
  dayjs(point.date_to).isAfter(dayjs());

export const filterPointPast = (point) =>
  dayjs(point.date_to).isBefore(dayjs());

