#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const { program } = require('commander');
const chalk = require('chalk');

function generateKey() {
  return crypto.randomBytes(32);
}

function encryptText(text, key) {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new Error('Key must be 32 bytes');
  }
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptText(encryptedData, key) {
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new Error('Key must be 32 bytes');
  }
  const [ivHex, encrypted] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function keyStringToBuffer(keyString) {
  if (keyString.length === 64) {
    return Buffer.from(keyString, 'hex');
  } else if (keyString.length === 44) {
    return Buffer.from(keyString, 'base64');
  } else {
    return crypto.createHash('sha256').update(keyString).digest();
  }
}

program.name('encryption').version('1.0.0');

program.command('generate-key').description('Generate encryption key').action(() => {
  const key = generateKey();
  console.log(chalk.green.bold('\n✓ Key Generated\n'));
  console.log('Hex:', chalk.cyan(key.toString('hex')));
  console.log('Base64:', chalk.cyan(key.toString('base64')));
  console.log();
});

program.command('encrypt <text> <key>').description('Encrypt text').action((text, key) => {
  try {
    const keyBuf = keyStringToBuffer(key);
    const encrypted = encryptText(text, keyBuf);
    console.log(chalk.green.bold('\n✓ Encrypted\n'));
    console.log(chalk.cyan(encrypted));
    console.log();
  } catch (e) {
    console.error(chalk.red('Error:'), e.message);
  }
});

program.command('decrypt <encrypted> <key>').description('Decrypt text').action((encrypted, key) => {
  try {
    const keyBuf = keyStringToBuffer(key);
    const decrypted = decryptText(encrypted, keyBuf);
    console.log(chalk.green.bold('\n✓ Decrypted\n'));
    console.log(chalk.cyan(decrypted));
    console.log();
  } catch (e) {
    console.error(chalk.red('Error:'), e.message);
  }
});

program.parse(process.argv);
