import { z } from "zod";

export const formatDate = (value) =>
  value ? String(value).slice(0, 10) : null;

export const formatDateWithoutTime = (value) =>
  value ? String(value).slice(0, 10) : null;

export const preprocessInt = (msg, intMsg = msg) =>
  z.preprocess((val) => {
    if (val === null || val === undefined || val === "") return undefined;
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? undefined : parsed;
  }, z.number({ required_error: msg }).int({ message: intMsg }));

export const preprocessDouble = (msg, doubleMsg = msg) =>
  z.preprocess(
    (val) => {
      if (val === null || val === undefined || val === "") return undefined;
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({ required_error: msg })
      .refine((val) => !isNaN(val), { message: doubleMsg })
  );

export const preprocessString = (msg, minMsg = msg) =>
  z.preprocess((val) => {
    if (typeof val === "string") return val.trim();
    return val;
  }, z.string({ required_error: msg }).min(1, { message: minMsg }));

export const preprocessEnum = (values, msg) =>
  z.enum(values, {
    required_error: msg,
    invalid_type_error: msg,
  });

export const preprocessAny = (validValues) =>
  z
    .union([
      z.string(),
      z.string().url("Must be a valid URL"),
      z.object(validValues || {}).partial(),
    ])
    .nullable()
    .optional();

export const preprocessDate = z.preprocess((val) => {
  if (!val || val === "") return undefined;
  const date =
    typeof val === "string" || val instanceof Date ? new Date(val) : null;
  return date instanceof Date && !isNaN(date.getTime()) ? date : undefined;
}, z.date().optional());

export const preprocessBoolean = (msg = "Invalid boolean value") =>
  z.preprocess((val) => {
    if (typeof val === "boolean") return val;
    if (typeof val === "string") {
      const lower = val.trim().toLowerCase();
      if (["true", "1", "yes", "on"].includes(lower)) return true;
      if (["false", "0", "no", "off"].includes(lower)) return false;
    }
    if (typeof val === "number") {
      if (val === 1) return true;
      if (val === 0) return false;
    }
    return undefined;
  }, z.boolean({ required_error: msg }));

export const formatData = (items, dateFields = [], datetimeFields = []) => {
  const formatDate = (val) => {
    if (!val) return null;
    return String(val).slice(0, 10);
  };

  const formatDateTime = (val) => {
    if (!val) return null;
    return String(val).slice(0, 19).replace("T", " ");
  };

  const getNested = (obj, path) =>
    path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

  const setNested = (obj, path, value) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((o, k) => (o[k] = o[k] || {}), obj);
    target[lastKey] = value;
  };

  return items.map((item) => {
    const newItem = JSON.parse(JSON.stringify(item));
    dateFields.forEach((field) => {
      const val = getNested(newItem, field);
      if (val) setNested(newItem, field, formatDate(val));
    });
    datetimeFields.forEach((field) => {
      const val = getNested(newItem, field);
      if (val) setNested(newItem, field, formatDateTime(val));
    });
    return newItem;
  });
};
