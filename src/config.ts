import { Book } from './types';
import { bookExample } from './example';

export const PREVIEW_SIZE = 4;
export const MAX_LENGTH_CONTENT = 350;
export const MAX_LENGTH_TITLE = 41;
// export const IMAGE_TYPE = 'heif'; //unsupported by browser
export const IMAGE_TYPE = 'png';

export const DATA: Book = bookExample;
