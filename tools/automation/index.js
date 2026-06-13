const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

class TaskScheduler {
  constructor() {
    this.tasks = new Map();
  }

  schedule(taskName, cronExpression, callback) {
    const task = cron.schedule(cronExpression, callback);
    this.tasks.set(taskName, task);
    return task;
  }

  stop(taskName) {
    if (this.tasks.has(taskName)) {
      this.tasks.get(taskName).stop();
      this.tasks.delete(taskName);
    }
  }

  stopAll() {
    this.tasks.forEach(task => task.stop());
    this.tasks.clear();
  }

  list() {
    return Array.from(this.tasks.keys());
  }
}

module.exports = {
  TaskScheduler
};
