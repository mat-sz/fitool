import { fromByteArray } from 'base64-js';

import { fileToArrayBuffer, fileToDataURL, fileToString } from './fileReaderFunctions';
import { parseDataURL, validateDataURL, encodeString, decodeString } from './dataUrlFunctions';

export type FileType = File | Blob | string | ArrayBuffer;

/**
 * Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a `File`.
 * @param file 
 * @param name 
 * @param type Mimetype.
 */
export const toFile = async (file: FileType, name?: string, type?: string): Promise<File> => {
    if (file instanceof File) {
        return new File([ file ], name || file.name, {
            type: type || file.type
        });
    }

    const blob = await toBlob(file);
    return new File([ blob ], name || '', {
        type
    });
};

/**
 * Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a `Blob`.
 * @param file 
 * @param type 
 */
export const toBlob = async (file: FileType, type?: string): Promise<Blob> => {
    if (file instanceof Blob) {
        return new Blob([ file ], {
            type: type || file.type
        });
    } else if (typeof file === 'string' && file.startsWith('blob:')) {
        const res = await fetch(file);
        return await res.blob();
    }
    
    const buffer = await toArrayBuffer(file);
    return new Blob([ buffer ], {
        type
    });
};

/**
 * Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a data URL.
 * @param file 
 */
export const toDataURL = async (file: FileType): Promise<string> => {
    if (typeof file === 'string') {
        if (validateDataURL(file)) {
            return file;
        } else if (file.startsWith('blob:')) {
            const res = await fetch(file);
            const blob = await res.blob();
            return await fileToDataURL(blob);
        } else {
            return 'data:text/plain;charset=UTF-8,' + file;
        }
    } else if (file instanceof Blob) {
        return await fileToDataURL(file);
    } else if (file instanceof ArrayBuffer) {
        return 'data:application/octet-stream;base64,' + fromByteArray(new Uint8Array(file));
    }

    throw new Error('Unsupported file type.');
};

/**
 * Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a blob URL.
 * @param file 
 */
export const toBlobURL = async (file: FileType): Promise<string> => {
    const blob = await toBlob(file);
    return URL.createObjectURL(blob);
};

/**
 * Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to an `ArrayBuffer`.
 * @param file 
 */
export const toArrayBuffer = async (file: FileType): Promise<ArrayBuffer> => {
    if (file instanceof ArrayBuffer) {
        return file;
    } else if (file instanceof Blob) {
        return await fileToArrayBuffer(file);
    } else if (typeof file === 'string') {
        if (validateDataURL(file)) {
            const parsed = parseDataURL(file);
            return parsed.data;
        } else if (file.startsWith('blob:')) {
            const res = await fetch(file);
            return await res.arrayBuffer();
        } else {
            return encodeString(file);
        }
    }

    throw new Error('Unsupported file type.');
};

/**
 * Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to an UTF-8 string.
 * @param file 
 */
export const toString = async (file: FileType): Promise<string> => {
    if (typeof file === 'string') {
        if (validateDataURL(file)) {
            const parsed = parseDataURL(file);
            return decodeString(parsed.data);
        } else if (file.startsWith('blob:')) {
            const res = await fetch(file);
            return await res.text();
        } else {
            return file;
        }
    } else if (file instanceof Blob) {
        return await fileToString(file);
    }

    const buffer = await toArrayBuffer(file);
    return decodeString(buffer);
};

/**
 * Initiates a download for a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string.
 * @param file 
 * @param name 
 */
export const download = async (file: FileType, name: string): Promise<void> => {
    let url = (typeof file === 'string' && file.startsWith('blob:')) ? file : await toDataURL(file);

    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', name);

    element.style.display = 'none';
    element.click();
};