const path = require('path');
const fse = require('fs-extra');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const { HttpError } = require('../../utils/errors');

module.exports = new (class ImagesMiddlewareFactory {
  #tempDirPath = path.join(process.cwd(), 'temp');
  #maxFileSize = 1 * 1024 * 1024;

  #buildStorage = () => {
    fse.ensureDirSync(this.#tempDirPath);

    return multer.diskStorage({
      destination: (_, __, cb) => {
        cb(null, this.#tempDirPath);
      },
      filename: (_, file, cb) => {
        const [fileType] = file.mimetype.split('/');

        if (fileType !== 'image') {
          cb(new HttpError(400, 'Allowed to upload only images'), null);
        }

        cb(null, `${uuid()}_${file.originalname}`);
      },
      limits: {
        fileSize: this.#maxFileSize,
      },
    });
  };

  #getMulter = () =>
    multer({
      storage: this.#buildStorage(),
    });

  withTempDirPath = tempDirPath => {
    this.#tempDirPath = tempDirPath;

    return this;
  };

  withMaxFileSize = maxFileSize => {
    this.#maxFileSize = Number.parseInt(maxFileSize);

    return this;
  };

  getSingleMiddleware = fieldname => this.#getMulter().single(fieldname);

  getArrayMiddleware = (fieldname, maxCount = undefined) =>
    this.#getMulter().array(fieldname, maxCount);

  getFieldsMiddleware = fields => this.#getMulter().fields(fields);
})();
