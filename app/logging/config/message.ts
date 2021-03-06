import dotenv from 'dotenv'
import * as colors from '../colors'
import { TransformableInfo } from 'logform'
import { format, transports } from 'winston'
dotenv.config()
const { combine, timestamp, label, printf, colorize } = format

const config = {
  level: process.env.LOG_LEVEL /* istanbul ignore next */ || 'info',
  format: combine(
    format(
      (info): TransformableInfo => {
        info.level = info.level.toLocaleUpperCase()
        return info
      },
    )(),
    combine(
      colorize({
        all: true,
      }),
      label({
        label: colors.yellow('Message'),
      }),
      timestamp({
        format: 'YYYY-MM-DD h:mm:SS A',
      }),
      printf(({ label, timestamp, level, message }): string => {
        return `${timestamp} [${label}] ${level} : ${message}`
      }),
    ),
  ),
  transports: [
    new transports.Console({
      silent: process.env.NODE_ENV === 'testing' && process.env.LOG_OUTPUT_WHILE_RUNNING_TESTS !== 'true',
    }),
  ],
}

export default config
