declare function baseLog(msg: any, color?: string): void;
declare function logGreen(msg: any): void;
declare function logRed(msg: any): void;
declare function asyncExec(cmd: any): Promise<{}>;
declare const _default: {
    logGreen: typeof logGreen;
    baseLog: typeof baseLog;
    logRed: typeof logRed;
    asyncExec: typeof asyncExec;
};
export default _default;
