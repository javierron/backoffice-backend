const convertDateToUTCTimestamp = date => {
  const localMiliseconds = date.getTime();
  const timezoneOffset = date.getTimezoneOffset() * 60000;

  return localMiliseconds - timezoneOffset;
};

const formatDateForMySQL = date =>
  date
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

module.exports = {
  convertDateToUTCTimestamp,
  formatDateForMySQL
};
