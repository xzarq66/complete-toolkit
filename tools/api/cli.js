#!/usr/bin/env node

const axios = require('axios');
const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');

program.name('api').version('1.0.0');

program
  .command('get <url>')
  .description('Make GET request to API')
  .option('-o, --output <file>', 'Save response')
  .action(async (url, options) => {
    try {
      console.log(chalk.blue('Requesting...'));
      const response = await axios.get(url);
      
      if (options.output) {
        fs.writeFileSync(options.output, JSON.stringify(response.data, null, 2));
        console.log(chalk.green('✓ Saved to:'), options.output);
      } else {
        console.log(chalk.green('\n✓ Response:\n'));
        console.log(JSON.stringify(response.data, null, 2));
      }
    } catch (e) {
      console.error(chalk.red('Error:'), e.message);
    }
  });

program
  .command('post <url> <data>')
  .description('Make POST request')
  .option('-o, --output <file>', 'Save response')
  .action(async (url, data, options) => {
    try {
      console.log(chalk.blue('Posting...'));
      const payload = JSON.parse(data);
      const response = await axios.post(url, payload);
      
      if (options.output) {
        fs.writeFileSync(options.output, JSON.stringify(response.data, null, 2));
        console.log(chalk.green('✓ Saved to:'), options.output);
      } else {
        console.log(chalk.green('\n✓ Response:\n'));
        console.log(JSON.stringify(response.data, null, 2));
      }
    } catch (e) {
      console.error(chalk.red('Error:'), e.message);
    }
  });

program.parse(process.argv);
