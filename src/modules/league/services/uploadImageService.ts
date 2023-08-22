export interface UploadImageServices {
    upload(path: string): Promise<string>
}
