import dayjs from 'dayjs';

export const filterPointFuture = (point) =>
  dayjs(point.dateFrom).isAfter(dayjs());

export const filterPointPresent = (point) =>
  dayjs(point.dateFrom).isBefore(dayjs()) &&
  dayjs(point.dateTo).isAfter(dayjs());

export const filterPointPast = (point) =>
  dayjs(point.dateTo).isBefore(dayjs());

