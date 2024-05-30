/**
 * Конвертирует Date в формат DD.MM.YYYY
 * @param date
 */
export function convertDate(date: Date) {
  const day = String(new Date(date).getDate()).padStart(2, "0");
  const month = String(new Date(date).getMonth() + 1).padStart(2, "0");
  const year = new Date(date).getFullYear();
  return {
    fullTime: `${day}.${month}.${year}`,
    day,
    month,
    year,
  };
}
