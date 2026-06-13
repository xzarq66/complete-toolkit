#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { BackupManager } = require('./index');
const path = require('path');

const backupMgr = new BackupManager('./backups');

program.name('backup').version('1.0.0');

program
  .command('file <filePath>')
  .description('Backup a single file')
  .option('-n, --name <name>', 'Backup name')
  .action((filePath, options) => {
    try {
      const backupPath = backupMgr.backupFile(filePath, options.name);
      console.log(chalk.green('✓ File backed up'));
      console.log('  Location:', chalk.cyan(backupPath));
    } catch (e) {
      console.error(chalk.red('Error:'), e.message);
    }
  });

program
  .command('dir <dirPath>')
  .description('Backup entire directory')
  .option('-n, --name <name>', 'Backup name')
  .action(async (dirPath, options) => {
    try {
      console.log(chalk.blue('Creating backup...'));
      const backupPath = await backupMgr.backupDirectory(dirPath, options.name);
      console.log(chalk.green('✓ Directory backed up'));
      console.log('  Location:', chalk.cyan(backupPath));
    } catch (e) {
      console.error(chalk.red('Error:'), e.message);
    }
  });

program
  .command('list')
  .description('List all backups')
  .action(() => {
    const backups = backupMgr.listBackups();
    if (backups.length === 0) {
      console.log(chalk.yellow('No backups found'));
    } else {
      console.log(chalk.green('✓ Backups:'));
      backups.forEach(b => {
        console.log(`  - ${chalk.cyan(b.name)} (${(b.size / 1024).toFixed(2)} KB)`);
      });
    }
  });

program.parse(process.argv);
