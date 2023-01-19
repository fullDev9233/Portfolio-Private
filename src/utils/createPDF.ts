import { base64ToArrayBuffer } from './toArrayBuffer';

export const createPdf = (data: string) => {
  const arrrayBuffer = base64ToArrayBuffer(data); //data is a the base64 encoded string

  const blob = new Blob([arrrayBuffer], { type: 'application/pdf' });
  const link = window.URL.createObjectURL(blob);
  window.open(link, '_blank');
};
