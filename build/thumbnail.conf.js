function getThumbnailConfigs(srcPath) {
  return {
    source: srcPath,
    destination: srcPath + '/thumbs',
    prefix: 'thumb_',
    suffix: '',
    width: '400',
    ignore: true // ignore unsupported files, e.g. .gitignore
  };
}

const thumbnailConfigs = [
  './app/img/gallery',
  './app/img/galleryLaunchEvent',
  './app/img/galleryAkkathon'
]
  .map(getThumbnailConfigs);

module.exports = {thumbnailConfigs};
