interface serverType {
    code: number | string;
    data: any;
    msg?: string;
    message?: string;
}
declare function uploadServer(name: string, filepath: any, options?: any): Promise<serverType>;
declare function packagePushServer({ token, ...requestData }: {
    [x: string]: any;
    token?: string | undefined;
}): Promise<serverType>;
export { uploadServer, packagePushServer };
