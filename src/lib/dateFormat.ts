const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatWeekday(date: Date): string {
  return `${weekdays[date.getDay()]}曜日`;
}
