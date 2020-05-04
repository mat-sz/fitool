const promisifyFileReader = (
  resolve: (result: any) => void,
  reject: (error: any) => void
) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', error => {
    reject(error);
  });

  return reader;
};

export const fileToDataURL = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = promisifyFileReader(resolve, reject);
    reader.readAsDataURL(file);
  });
