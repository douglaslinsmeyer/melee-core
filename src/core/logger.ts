import { Logger } from 'tslog';

const appLogger = new Logger({ 
    name: 'melee',
    type: 'pretty',
});

export const combatLog: string[] = [];

export const logger = {
    silly: (message: string) => appLogger.silly(message),
    trace: (message: string) => appLogger.trace(message),
    debug: (message: string) => appLogger.debug(message),
    info: (message: string) => appLogger.info(message),
    warn: (message: string) => appLogger.warn(message),
    error: (message: string) => appLogger.error(message),
    fatal: (message: string) => appLogger.fatal(message),
    combat: (message: string) => {
        const todaysDate = new Date().toISOString();
        combatLog.push(`[${todaysDate}] ${message}`);
    }
};