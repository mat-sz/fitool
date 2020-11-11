<h1 align="center">🔧 fitool</h1>

<p align="center">
TypeScript file functions library.
</p>

<p align="center">
<a href="https://npmjs.com/package/fitool">
<img alt="npm" src="https://img.shields.io/npm/v/fitool">
<img alt="npm" src="https://img.shields.io/npm/dw/fitool">
<img alt="NPM" src="https://img.shields.io/npm/l/fitool">
</a>
</p>

<p align="center">
<strong>Quickstart:</strong>
</p>

```sh
npm install fitool
# or:
yarn add fitool
```

## Table of contents

1. [Examples](#examples)
2. [Usage](#usage)

## Examples

### Convert `text/plain` data URL to string

```js
import { download } from 'fitool';

async function example() {
  const result = await toString('data:text/plain,abc');
  // result = abc
}
```

### Download data URL

```js
import { download } from 'fitool';

async function example() {
  await download('data:image/png;base64,...');
}
```

## Usage

### toFile(file: File | Blob | string | ArrayBuffer, name?: string): Promise\<File\>

Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a `File`.

### toBlob(file: File | Blob | string | ArrayBuffer): Promise\<Blob\>

Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a `Blob`.

### toDataURL(file: File | Blob | string | ArrayBuffer): Promise\<string\>

Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a data URL.

### toBlobURL(file: File | Blob | string | ArrayBuffer): Promise\<string\>

Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to a blob URL.

### toArrayBuffer(file: File | Blob | string | ArrayBuffer): Promise\<ArrayBuffer\>

Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to an `ArrayBuffer`.

### toString(file: File | Blob | string | ArrayBuffer): Promise\<string\>

Converts a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string to an UTF-8 string.

### download(file: File | Blob | string | ArrayBuffer, name: string): Promise\<void\>

Initiates a download for a given `File`, `Blob`, `ArrayBuffer`, data URL, blob URL or string.
