#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { PrivacyManager } = require('./index');
const fs = require('fs');

const privacy = new PrivacyManager();

program.name('privacy').version('1.0.0');

program
  .command('anonymize <text>')
  .description('Anonymize text (remove PII)')
  .action((text) => {
    const result = privacy.anonymizeText(text);
    console.log(chalk.green('✓ Anonymized:\n'));
    console.log(chalk.cyan(result));
  });

program
  .command('anonymize-file <filePath>')
  .description('Anonymize file content')
  .option('-o, --output <file>', 'Output file')
  .action((filePath, options) => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const anonymized = privacy.anonymizeText(content);
      
      if (options.output) {
        fs.writeFileSync(options.output, anonymized);
        console.log(chalk.green('✓ Saved to:'), options.output);
      } else {
        console.log(chalk.green('✓ Result:\n'));
        console.log(chalk.cyan(anonymized.substring(0, 300)));
      }
    } catch (e) {
      console.error(chalk.red('Error:'), e.message);
    }
  });

program
  .command('mask-email <email>')
  .description('Mask email address')
  .action((email) => {
    const masked = privacy.maskEmail(email);
    console.log(chalk.green('✓ Masked:'), chalk.cyan(masked));
  });

program
  .command('mask-phone <phone>')
  .description('Mask phone number')
  .action((phone) => {
    const masked = privacy.maskPhone(phone);
    console.log(chalk.green('✓ Masked:'), chalk.cyan(masked));
  });

program
  .command('anon-id')
  .description('Generate anonymous ID')
  .action(() => {
    const id = privacy.generateAnonymousId();
    console.log(chalk.green('✓ Anonymous ID:'), chalk.cyan(id));
  });

program.parse(process.argv);
