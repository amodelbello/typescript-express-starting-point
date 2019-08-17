import bunyan from 'bunyan'

export const loggerInstance = bunyan.createLogger({
  name: 'transaction-notifier',
  serializers: {
    req: require('bunyan-express-serializer'),
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  level: 'info',
})

export const logResponse = (id: string, body: string, statusCode: number): void => {
  const log = loggerInstance.child(
    {
      id,
      body,
      statusCode,
    },
    true,
  )
  log.info('response')
}
