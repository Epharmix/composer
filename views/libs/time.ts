import moment from 'moment-timezone';

export const TIMEZONES = [
  'US/Alaska',
  'US/Arizona',
  'US/Central',
  'US/Eastern',
  'US/East-Indiana',
  'US/Hawaii',
  'US/Mountain',
  'US/Pacific',
  'US/Samoa'
] as const;

export const GetCurrentTZ = (): string => {
  let tz: string = moment.tz.guess();
  // Attempt to resolve more accurately
  const summer = new Date(Date.UTC(2005, 6, 30, 0, 0, 0, 0));
  const so = -1 * summer.getTimezoneOffset();
  const winter = new Date(Date.UTC(2005, 12, 30, 0, 0, 0, 0));
  const wo = -1 * winter.getTimezoneOffset();
  if (so === -480 && wo === -540) {
    tz = 'US/Alaska';
  } else if (so === -420 && wo === -420) {
    tz = 'US/Arizona';
  } else if (so === -300 && wo === -360) {
    tz = 'US/Central';
  } else if (so === -240 && wo === -300) {
    tz = 'US/Eastern';
  } else if (so === -300 && wo === -300) {
    tz = 'US/East-Indiana';
  } else if (so === -600 && wo === -600) {
    tz = 'US/Hawaii';
  } else if (so === -360 && wo === -420) {
    tz = 'US/Mountain';
  } else if (so === -420 && wo === -480) {
    tz = 'US/Pacific';
  } else if (so === -660 && wo === -660) {
    tz = 'US/Samoa';
  }
  return tz;
};

export const FormatDate = (time: Date, format?: string, tz?: string): string => {
  tz = tz || GetCurrentTZ();
  format = format || 'MM/DD/YYYY';
  return moment.tz(time, tz).format(format);
};
