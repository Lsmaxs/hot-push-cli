declare function getFileMd5(filePath: string): Promise<{} | null>;
declare function uploadFile(filePath: string): Promise<false | {
    packagePath: any;
    md5: {} | null;
}>;
interface packagePushType {
    filePath: string;
    description: string;
    platform: string;
}
declare function packagePush(options: packagePushType): Promise<false | undefined>;
export { getFileMd5, uploadFile, packagePush };
