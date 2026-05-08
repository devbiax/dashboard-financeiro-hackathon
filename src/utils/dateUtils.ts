export const parseFinancialDate = (value: string) => {
  if (!value) return new Date();

  if (value.includes('/')) {
    const [day, month, year] = value.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const [year, month, day] = value.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const formatFinancialDate = (value: string) => {
  if (!value) return '--';

  const date = parseFinancialDate(value);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getTodayFinancialDate = () => formatFinancialDate(new Date().toISOString().slice(0, 10));

export const getTodayInputDate = () => new Date().toISOString().slice(0, 10);
