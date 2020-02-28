import { toByteArray } from 'base64-js';
type DataURLParseResult = { type: string, data: ArrayBuffer };

export const validateDataURL = (url: string): boolean => {
    if (typeof url !== 'string' || !url.startsWith('data:')) {
        return false;
    }

    if (!url.includes(',')) {
        return false;
    }

    return true;
};

export const encodeString = (string: string): ArrayBuffer => {
    const encoder = new TextEncoder();
    return encoder.encode(string).buffer;
};

export const decodeString = (buffer: ArrayBuffer): string => {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
};

export const parseDataURL = (url: string): DataURLParseResult => {
    if (!validateDataURL(url)) {
        throw new Error('The string is not a valid data URL.');
    }

    const split = url.split(',', 2);
    const type = split[0].split(':')[1].split(';');
    let data: ArrayBuffer;
    if (type.includes('base64')) {
        data = toByteArray(split[1]);
    } else {
        data = encodeString(split[1]);
    }

    return {
        type: type[0],
        data,
    };
};