import winston from "winston";
import path from "path";
import moment from "moment-timezone";
import fs from "fs";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const timeZone = "Asia/Bangkok";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? JSON.stringify(meta, null, 2)
        : "";
      const stackMsg = stack ? `\n${stack}` : "";
      return `${timestamp} [${level}]: ${message}${stackMsg} ${metaString}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "application.log"),
      level: "info",
    }),
  ],
});

export default logger;
