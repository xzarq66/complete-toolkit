const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

class BackupManager {
  constructor(backupDir = './backups') {
    this.backupDir = backupDir;
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
  }

  backupFile(filePath, backupName) {
    const fileName = path.basename(filePath);
    const backupPath = path.join(this.backupDir, backupName || `${fileName}.bak`);
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  }

  backupDirectory(dirPath, backupName) {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(
        path.join(this.backupDir, backupName || `backup-${Date.now()}.zip`)
      );
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => resolve(output.path));
      archive.on('error', reject);
      archive.pipe(output);
      archive.directory(dirPath, false);
      archive.finalize();
    });
  }

  listBackups() {
    return fs.readdirSync(this.backupDir).map(file => ({
      name: file,
      path: path.join(this.backupDir, file),
      size: fs.statSync(path.join(this.backupDir, file)).size,
      created: fs.statSync(path.join(this.backupDir, file)).birthtime
    }));
  }
}

module.exports = {
  BackupManager
};
