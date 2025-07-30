import chokidar  from 'chokidar';
import fs from 'fs';
import logger from './src/Config/logger.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const watchPath=process.env.EXCEL_FILE_PATH;

if (!watchPath) {
  throw new Error("❌ EXCEL_FILE_PATH is not defined in .env");
}

if (!fs.existsSync(watchPath)) {
  fs.mkdirSync(watchPath, { recursive: true });
}


//CHOUKIDAR CONFIGURATION
const watcher = chokidar.watch(watchPath, {
  ignored: /^\./,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: process.env.EXCEL_LOOP_INTERVAL
  }
});

console.log(`👁️  Watching folder: ${watchPath}`);
logger.info(`👁️  Watching folder: ${watchPath}`);

watcher.on('add', (filePath) => {
    if (path.extname(filePath)  === '.xlsx' || path.extname(filePath)  === '.csv' ) {
        logger.info(`📥 New .xlsx file detected: ${filePath}`);
    }
});

watcher.on('error', error => {
    logger.error(`❌ Service error: ${error}`);
    console.log(`❌ Service error: ${error}`)

});


