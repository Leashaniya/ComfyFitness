const pino=require("pino");

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime : "SYS:dd-mm-yyyy HH:MM:ss",
        },
    },
});

module.exports=logger;