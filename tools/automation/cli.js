#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { TaskScheduler } = require('./index');

const scheduler = new TaskScheduler();

program.name('automation').version('1.0.0');

program
  .command('schedule <name> <cron>')
  .description('Schedule a task (cron format)')
  .action((name, cron) => {
    scheduler.schedule(name, cron, () => {
      console.log(chalk.green(`✓ Task "${name}" executed at ${new Date().toISOString()}`));
    });
    console.log(chalk.green('✓ Task scheduled:'), name);
    console.log('  Cron:', chalk.cyan(cron));
    console.log('  Example: "0 9 * * 1" = Every Monday at 9 AM');
  });

program
  .command('list')
  .description('List scheduled tasks')
  .action(() => {
    const tasks = scheduler.list();
    if (tasks.length === 0) {
      console.log(chalk.yellow('No tasks scheduled'));
    } else {
      console.log(chalk.green('✓ Scheduled tasks:'));
      tasks.forEach(task => console.log('  -', chalk.cyan(task)));
    }
  });

program.parse(process.argv);
