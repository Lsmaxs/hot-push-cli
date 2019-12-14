declare function getConfig(key?: string): Promise<any>;
declare function setConfig(key: string, val?: string | number): Promise<any>;
declare function initConfig(): Promise<void>;
export { initConfig, getConfig, setConfig };
