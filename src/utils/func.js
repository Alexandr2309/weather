export const getNormalizeData = (date) => {
  return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
};

export const normalizeStrTime = (h, m, timezone) => {
  if (+m >= 60) {
    m = +m - 60;
    h = +h + 1;
  }
  let hours = (+h + timezone);
  if (hours >= 24) {
    hours = hours - 24;
  }
  return ('0' + hours).slice(-2) + ':' + ('0' + m).slice(-2);
}
export const getDay = (date) => {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
};
export const getMonth = (date) => {
  const months = ['Январь', 'Февраль', 'Март', 'апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  return months[date.getMonth()];
}
export const switchDays = (day) => {
  switch (day) {
    case 'tomorrow':
      return 'tomorrow';
    case 'day3':
      return 'day3';
    case 'day4':
      return 'day4';
    case 'day5':
      return 'day5';
    case 'day6':
      return 'day6';
    default:
      return 'today';
  }
}