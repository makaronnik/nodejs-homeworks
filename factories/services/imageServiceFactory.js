const path = require('path');
const Jimp = require('jimp');
const fse = require('fs-extra');
const { log } = require('console');

class ImagesService {
  #storageDir;
  #imageWith;
  #imageHeight;
  #imageQuality;
  #storageDirFullPath;

  constructor(
    rootStaticDirPath,
    storageDir,
    imageWith,
    imageHeight,
    imageQuality
  ) {
    this.#storageDir = storageDir;
    this.#imageWith = imageWith;
    this.#imageHeight = imageHeight;
    this.#imageQuality = imageQuality;

    this.#storageDirFullPath = path.join(rootStaticDirPath, storageDir);
  }

  #prepareHandledImageDir = () => {
    fse.ensureDirSync(this.#storageDirFullPath);
  };

  #getStorageDirPreparedForUri = () =>
    this.#storageDir
      .replace(/\/\//g, '/')
      .replace(/\\\\/g, '/')
      .replace(/\\/g, '/');

  #getFilenamePreparedForUri = rawFilename =>
    rawFilename.replace(/[<>\#%\{\}\\~\[\];\/?:@=&"\s\']/g, '');

  #getHandledImageUri = imageFileName =>
    `/${this.#getStorageDirPreparedForUri()}/${imageFileName}`;

  #getHandledImageFullPath = imageFileName =>
    path.join(this.#storageDirFullPath, imageFileName);

  handleImage = imageFileData => {
    const { path: fileFullPath, filename: rawFilename } = imageFileData;

    const filename = this.#getFilenamePreparedForUri(rawFilename);

    const handledImageFullPath = this.#getHandledImageFullPath(filename);

    this.#prepareHandledImageDir();

    Jimp.read(fileFullPath, (err, file) => {
      if (err) throw err;

      file
        .cover(this.#imageWith, this.#imageHeight)
        .quality(this.#imageQuality)
        .write(handledImageFullPath);
    });

    return this.#getHandledImageUri(filename);
  };
}

exports.ImagesServiceFactory = new (class {
  #rootStaticDirName = 'static';
  #storageDirName = 'images';
  #imageWith = 250;
  #imageHeight = 250;
  #imageQuality = 90;

  #getRootStaticDirPath = () =>
    path.join(process.cwd(), this.#rootStaticDirName);

  withRootStaticDir = (...segmentsOfRootStaticDirName) => {
    this.#rootStaticDirName = path.join(...segmentsOfRootStaticDirName);

    return this;
  };

  withStorageDir = (...segmentsOfStorageDirName) => {
    this.#storageDirName = path.join(...segmentsOfStorageDirName);

    return this;
  };

  withImageWith = imageWith => {
    this.#imageWith = Number.parseInt(imageWith);

    return this;
  };

  withImageHeight = imageHeight => {
    this.#imageHeight = Number.parseInt(imageHeight);

    return this;
  };

  withImageQuality = imageQuality => {
    this.#imageQuality = Number.parseInt(imageQuality);

    return this;
  };

  getImageService = () =>
    new ImagesService(
      this.#getRootStaticDirPath(),
      this.#storageDirName,
      this.#imageWith,
      this.#imageHeight,
      this.#imageQuality
    );
})();
