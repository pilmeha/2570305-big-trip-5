import dayjs from 'dayjs';

export function formatEventTime(dateFrom, dateTo) {
  return `${dayjs(dateFrom).format('HH:mm')} — ${dayjs(dateTo).format('HH:mm')}`;
}

export function formatDuration(dateFrom, dateTo) {
  const diffMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (diffMinutes < 60) {
    return `${diffMinutes}M`;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (diffMinutes < 1440) {
    return `
      ${String(hours).padStart(2, '0')}H
      ${String(minutes).padStart(2, '0')}M
    `;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return `
    ${String(days).padStart(2, '0')}D
    ${String(remainingHours).padStart(2, '0')}H
    ${String(minutes).padStart(2, '0')}M
  `;
}

export function formatEventDate(date) {
  return dayjs(date).format('MMM DD');
}
