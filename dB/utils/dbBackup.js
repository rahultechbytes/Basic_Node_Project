
// // Auto backup script

// module.exports.dbAutoBackUp = function (env = null) {
//     if (env) {
//         dbOptions = CONFIG[env];
//     } else {
//         env = process.env.ENV;
//     }
//     console.log("called", new Date());
//     // check for auto backup is enabled or disabled
//     if (dbOptions.autoBackup == true) {
//         var date = new Date();
//         var beforeDate, oldBackupDir, oldBackupPath;
//         currentDate = stringToDate(date); // Current date
//         var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + "-" + currentDate.getHours() + "-" + currentDate.getMinutes();
//         var newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
//         // check for remove old backup after keeping # of days given in configuration
//         if (dbOptions.removeOldBackup == true) {
//             beforeDate = _.clone(currentDate);
//             beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
//             oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
//             oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
//         }
//         var auth = "";
//         if (dbOptions.user && dbOptions.pass) {
//             auth = ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass;
//         }
//         var cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + auth + ' --out ' + newBackupPath; // Command for mongodb dump process
//         var child = exec(cmd);
//         child.stdout.on('data', function (data) {
//             if (dbOptions.removeOldBackup == true) {
//                 if (fs.existsSync(oldBackupPath)) {
//                     exec("rm -rf " + oldBackupPath, function (err) { });
//                 }
//             }
//         });
//         child.stderr.on('data', function (data) {
//             console.log("==================", cmd, "\n", 'mongodump StdERROut: ', data, "\n===========================");
//         });
//         child.on('close', function (code) {
//             var newTarFileName = newBackupPath + "-" + env + ".tar.gz";
//             var tarcmd = "tar -cvzf " + newTarFileName + " " + newBackupPath;
//             var tarChild = exec(tarcmd);
//             console.log("tarcmd ", tarcmd);
//             tarChild.stdout.on('data', function (data) {
//                 if (dbOptions.removeOldBackup == true) {
//                     if (fs.existsSync(oldBackupPath)) {
//                         exec("rm -rf " + oldBackupPath, function (err) { });
//                     }
//                 }
//             });
//             tarChild.stderr.on('data', function (data) {
//                 console.log("==================\n", tarcmd, "\n", 'tarChild StdERROut: ', data, "\n===========================");
//             });
//             tarChild.on('close', function (code) {
//                 var backupPath = newTarFileName;
//                 let backupPathSize = getFilesizeInBytes(backupPath);
//                 let prms1 = new Promise((resolve, reject) => {
//                     let doChildCMD = "scp -i ~/ssh_keys/isdigitalocean " + backupPath + " root@139.59.81.108:/var/backups/";
//                     let doChild = exec(doChildCMD);
//                     doChild.stdout.on('data', function (data) {

//                     });
//                     doChild.stderr.on('data', function (data) {
//                         console.log("==================\n", doChildCMD, "\n", 'doChild StdERROut: ', data, "\n===========================");
//                         resolve({ message: "Error occured while uploading on Digital Ocean", data: data });
//                     });
//                     doChild.on('close', function (code) {
//                         let time = moment().format("DD MMM YY HH:mm:ss");
//                         Slack.Slack("Hi @abc\n uploaded " + env + " file(" + backupPathSize + " M) on Digital Ocean\n At : " + time + "\n");
//                         resolve({ message: "Uploaded on Digital Ocean" });
//                     });
//                 });
//                 let prms2 = new Promise((resolve, reject) => {
//                     S3.uploadFileFromDiskDBBackup(backupPath, function (err, data) {
//                         if (err) {
//                             resolve({ message: "Error occured while uploading on S3", "err": err });
//                         } else {
//                             let time = moment().format("DD MMM YY HH:mm:ss");
//                             Slack.Slack("Hi @Amresh\n Taken  " + env + " db backup and uploaded file(" + backupPathSize + " M) on S3\n At " + time + "\n URL : " + data);
//                             resolve({ message: "uploaded on S3" });
//                         }
//                     });
//                 });
//                 Promise.all([prms1, prms2]).then((values) => {
//                     console.log("newBackupPath", newBackupPath);
//                 	/*exec("rm -rf " + newBackupPath + " "+newTarFileName, function (err) {
//                     	if(err){
//                         	console.log("ERR in removing file",err);
//                     	}else{
//                         	console.log("prev files removed");
//                     	}
//                 	});*/
//                     console.log("values : ", values);
//                     // let time = moment().format("DD MMM YY HH:mm:ss");
//                     // Slack.Slack("Hi Team,\n Taken db backup, uploaded file on S3 and Digital Ocean\n At: "+ time +"\n\n Note : For any query contact \n@Amresh");
//                 }, (error) => {
//                     console.log("\n\nERROR ++++++++++++++++++++++++++++++++++++++++++", error);
//                 }).catch((error) => {
//                     console.log("\n\n CAUGHT ERROR ++++++++++++++++++++++++++++++++++++++++++", error);
//                 });
//                 console.log('closing tarChild: ' + code);
//             });
//             console.log('closing code: ' + code);
//         });
//     }
//     function getFilesizeInBytes(filename) {
//         var stats = fs.statSync(filename)
//         var fileSizeInBytes = stats["size"]
//         return fileSizeInBytes / 1000000.0
//     }
// }

const { exec } = require('child_process');
const path = require('path');
const dbHost = 'localhost:27017';
const dbName = 'nodeApp'

module.exports.dbDump = () => {
    let backupFolder = process.cwd()
    let cmd = `mongodump --host ${dbHost} --db ${dbName} --out ${backupFolder}/Backup/`;
    let child = exec(cmd);
    child.stdout.on('data', function (data) {
        console.log("data...", data);
    });
    child.stderr.on('data', function (err) {
        console.log("==================", cmd, "\n", 'mongodump StdERROut: ', err, "\n===========================");
    });
    

}
