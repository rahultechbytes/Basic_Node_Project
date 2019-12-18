const CronJob = require('cron').CronJob;
const { dbDump } = require('../dB/utils/dbBackup');

console.log("before job initialize");
const job = new CronJob('10 32 15 * * *', function () {
    const date = new Date();
    console.log("DB data dumped at ",date);
    dbDump();
});

job.stop();


console.log("After Job Initialize");

module.exports = job;