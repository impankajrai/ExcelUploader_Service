import dotenv from 'dotenv';
import chokidar  from 'chokidar';
import fs from 'fs'
import path from 'path';
import logger from '../Config/logger.js'
dotenv.config();

const pathWatcher=async (watcherPath,{CreateDirIfNotExist,fileType},onFileDetect)=>{
    if (!watcherPath) {
      throw new Error("❌ EXCEL_FILE_PATH is not defined in .env");
    }


    if (CreateDirIfNotExist && !fs.existsSync(watcherPath)) {
      fs.mkdirSync(watcherPath, { recursive: true });
    }
    
    //CHOUKIDAR CONFIGURATION
    const watcher = chokidar.watch(watcherPath, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: false,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: process.env.EXCEL_LOOP_INTERVAL
      }
    });

    console.log(`👁️  Watching folder: ${watcherPath}`);
    logger.info(`👁️  Watching folder: ${watcherPath}`);

    watcher.on('add', (watcherPath) => {
        if ( fileType.includes(path.extname(watcherPath))) {
        logger.info(`📥 New .xlsx file detected: ${watcherPath}`);
        onFileDetect(watcherPath) 
        }
    });
    
    watcher.on('error', error => {
        logger.error(`❌ Service error: ${error}`);
        console.log(`❌ Service error: ${error}`)
        onFileDetect(null)
    
    });
}




export default pathWatcher;

