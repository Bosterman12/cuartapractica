import winston, { Logger } from 'winston';
import config from '../config/config.js';


/*const logger = winston.createLogger({
    transports : [
        new winston.transports.Console ({level : "http"}),
        new winston.transports.File({filename: "./error.log", level : "warn"})
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()

}*/

const levelOptions = {
    levels : {
        fatal : 0,
        error : 1,
        warning : 2,
        info: 3,
        http: 4,
        debug: 5
    },
   
    colors : {
        fatal : 'magenta',
        error : 'red',
        warning : 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }

    
}

export const devLogger = winston.createLogger({
    levels : levelOptions.levels,
    transports : [
        new winston.transports.Console ({level : "debug",
        format: winston.format.combine(
            winston.format.colorize({colors : levelOptions.colors}),
            winston.format.simple()
        )
    }),
        new winston.transports.File({filename: "./deverror.log", level : "debug"},
            winston.format.simple()
        )
    ]
})


export const prodLogger = winston.createLogger({
    levels : levelOptions.levels,
    transports : [
        new winston.transports.Console ({level : "info",
        format: winston.format.combine(
            winston.format.colorize({colors : levelOptions.colors}),
            winston.format.simple()
        )
    }),
        new winston.transports.File({filename: "./proderror.log", level : "info"},
            winston.format.simple()
        )
    ]
})

/*export const addLogger = (req, res, next) => {
    req.logger =  devLogger 
    
    req.logger.fatal(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()

}*/

export const addLogger = (req, res, next) => {
    if(config.SECRET_KEY !== 'TEST'){
        req.logger =  devLogger
        
    }else{
        req.logger =  prodLogger
    }

     
    
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()

}