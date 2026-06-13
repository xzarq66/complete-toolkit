#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');
const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');

program.name('scraper').version('1.0.0');

program
  .command('fetch <url>')
  .description('Fetch content from URL')
  .option('-o, --output <file>', 'Save to file')
  .action(async (url, options) => {
    try {
      console.log(chalk.blue('Fetching...'));
      const response = await axios.get(url, {
        timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      
      if (options.output) {
        fs.writeFileSync(options.output, response.data);
        console.log(chalk.green('✓ Saved to:'), options.output);
      } else {
        console.log(chalk.green('\n✓ Content:\n'));
        console.log(response.data.substring(0, 500));
      }
    } catch (e) {
      console.error(chalk.red('Error:'), e.message);
    }
  });

program
  .command('scrape <url> <selector>')
  .description('Scrape specific elements')
  .option('-o, --output <file>', 'Save to JSON')
  .action(async (url, selector, options) => {
    try {
      console.log(chalk.blue('Scraping...'));
      const response = await axios.get(url, {
        timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      
      const $ = cheerio.load(response.data);
      const results = [];
      
      $(selector).each((i, el) => {
        results.push({
          text: $(el).text(),
          html: $(el).html(),
          attrs: $(el).attr()
        });
      });
      
      if (options.output) {
        fs.writeFileSync(options.output, JSON.stringify(results, null, 2));
        console.log(chalk.green('✓ Saved to:'), options.output);
      } else {
        console.log(chalk.green('\n✓ Found ' + results.length + ' elements\n'));
        console.log(JSON.stringify(results.slice(0, 3), null, 2));
      }
    } catch (e) {
      console.error(chalk.red('Error:'), e.message);
    }
  });

program.parse(process.argv);
