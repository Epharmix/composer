/**
 * Logger
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

abstract class AbstractLogger {

  protected abstract write(level: string, data: any, message?: string): void;

  public debug(data: any, message?: string) {
    this.write('debug', data, message);
  }

  public info(data: any, message?: string) {
    this.write('info', data, message);
  }

  public warn(data: any, message?: string) {
    this.write('warn', data, message);
  }

  public error(data: any, message?: string) {
    this.write('error', data, message);
  }

}

/**
 * Standard logger that uses stdout for logging
 */
class StandardLogger extends AbstractLogger {

  protected write(level: string, data: any, message?: string) {
    // eslint-disable-next-line no-console
    console[level](data);
    if (message) {
      // eslint-disable-next-line no-console
      console[level](message);
    }
  }

}

const DefaultLogger: AbstractLogger = new StandardLogger();

export default DefaultLogger;
