import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor() { }
  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileName = this.generateUniqueFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const filePath = `${fileName}`;
        this.saveFileLocally(filePath, reader.result).then(() => {
          resolve(filePath);
        }).catch((error) => {
          reject(error);
        });
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  private generateUniqueFileName(originalFileName: string): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2);
    const fileExtension = this.getFileExtension(originalFileName);
    return `${timestamp}_${randomString}.${fileExtension}`;
  }

  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }

  private saveFileLocally(filePath: string, fileData: string | ArrayBuffer | null): Promise<void> {
    return new Promise((resolve, reject) => {
      const blob = this.dataURItoBlob(fileData as string);
      const fileURL = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = fileURL;
      link.download = filePath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(fileURL);

      resolve();
    });
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}