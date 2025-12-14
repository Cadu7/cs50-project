import moment, {type Moment} from 'moment';

export const getNextMonths = (count: number): { monthName: string, monthNumber: number }[] => {
  const months: { monthName: string, monthNumber: number }[] = [];
  const date = new Date();
  
  for (let i = 0; i < count; i++) {
    const d = new Date(date.getFullYear(), date.getMonth() + i, 1);
    months.push(
      {monthName: d.toLocaleDateString('en', {month: 'long', year: 'numeric'}), monthNumber: d.getMonth() + 1}
    );
  }
  
  return months;
};

export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

export const getMonth = (month: number): Moment => {
  const now = moment();
  
  let target = moment().month(month);
  
  if (target.isSame(now, 'month')) {
    return now.clone();
  }
  
  if (target.isBefore(now, 'month')) {
    target = target.add(1, 'year');
  }
  
  return target.startOf('month');
};