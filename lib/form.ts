import dayjs from 'dayjs';

export function parse(v: string | null | undefined) {
  return v ? dayjs(v) : null;
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function format(d: dayjs.Dayjs | Date | null, template?: string) {
  if (isValidDate(d)) {
    return dayjs(d).format(template) as 'datetime' | undefined;
  }
  return d?.format(template) as 'datetime' | undefined;
}
