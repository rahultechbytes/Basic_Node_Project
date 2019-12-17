const CronJob = require('cron').CronJob;
const { dbDump } = require('../dB/utils/dbBackup');

console.log("before job initialize");
module.exports.job = new CronJob('* 10 15 * * *', function () {
    const date = new Date();
    console.log("DB data dumped at ",date);
    dbDump();
});

console.log("After Job Initialize");

