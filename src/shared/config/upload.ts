import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp');

// SALVA EM DISCO PERMANENTEMENTE ATÉ QUE SEJA DELTADO.
export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

// SALVA TEMPORARIMENTE EM MEMORIA - ENVIO PARA ALGO EXTERNO.

// export default {
//   storage: multer.memoryStorage(), // permite acesso a file.buffer
// };
