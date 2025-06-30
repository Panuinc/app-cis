import moment from "moment-timezone";

export function getLocalNow(timezone = "Asia/Bangkok") {
  return moment().tz(timezone).toDate();
}
