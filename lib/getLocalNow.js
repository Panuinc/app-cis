export function getLocalNow(offsetHours = 7) {
  const utc = new Date();
  const local = new Date(utc.getTime() + offsetHours * 60 * 60 * 1000);
  local.setMilliseconds(0);
  return local;
}
