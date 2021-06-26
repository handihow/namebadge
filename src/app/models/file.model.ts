interface UCImageProps {
  width: number;
  height: number;
  format: string;
  datetime_original?: any;
  geo_location?: any;
  orientation?: any;
  dpi?: any;
  sourceInfo?: any; //Object with information about file source. For example this can be name of social network, public link if any, owner’s user name etc. This information is not stored on our servers and available only on the page where file was uploaded.
}

export default interface UCFile {
  uuid: string; //File UUID.
  name: string; //Original name of the uploaded file.
  size: number; //File size in bytes.
  isStored: boolean; //true, if the file is stored in our storage, false otherwise.
  isImage: boolean; //true, if the file is an image, false otherwise.
  cdnUrl: string; //Public file CDN URL, may contain CDN operations.
  cdnUrlModifiers?: string; //URL part with applied CDN operations or null. Appear after user crops image, for example.
  originalUrl: string; //Public file CDN URL without any operations.
  originalImageInfo?: UCImageProps; //Object with original image properties if file is image, null otherwise.
  sourceInfo?: any;
}


