const sharp = require('sharp');
const path = require('path');

class Resize {
  constructor(folder, userID) {
    this.folder = folder;
    this.userID = userID;
  }
  async save(buffer) {
    const filename = this.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }
  filename() {
    return `${this.userID}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;