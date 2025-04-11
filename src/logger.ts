import { Logger } from 'tslog';

const appLogger = new Logger({
    name: 'MeleeCore',
});

export const combatLoggerArray: any[] = [];

export const getCombatLog = () => {
    return 
}

const combatLogger = new Logger({
    name: 'CombatLog',
    type: 'hidden',
});

combatLogger.attachTransport((logObj) => {
    combatLoggerArray.push(logObj);
});

export const logger = {
    info: (message: string, ...args: any[]) => {
        appLogger.info(message, ...args);
    },
    combat: (message: string, ...args: any[]) => {
        appLogger.info(message, ...args);
        combatLogger.info(message, ...args);
    },
    trace: (message: string, ...args: any[]) => {
        appLogger.trace(message, ...args);
    },
    error: (message: string, ...args: any[]) => {
        appLogger.error(message, ...args);
    },
    warn: (message: string, ...args: any[]) => {
        appLogger.warn(message, ...args);
    },
    debug: (message: string, ...args: any[]) => {
        appLogger.debug(message, ...args);
    },
    silly: (message: string, ...args: any[]) => {
        appLogger.silly(message, ...args);
    },
};