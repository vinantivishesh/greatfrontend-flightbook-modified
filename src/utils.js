const DAYS_IN_SECONDS = 24 * 60 * 60 * 1000;

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // since month number starts from 0, so added 1 to get display month number
  const day = date.getDate().toString().padStart(2, '0');
  return [year, month, day].join('-');
};

export const TODAY = formatDate(new Date());
export const TOMORROW = formatDate(new Date(Date.now() + DAYS_IN_SECONDS));
