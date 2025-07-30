import path from "path";
import dotenv from "dotenv";
import pathWatcher from "./src/Utils/pathWatcher.js";
import readExcel from "./src/Utils/ExcelReader.js";
import logger from "./src/Config/logger.js";
dotenv.config();
const watcherPath = path.resolve(process.env.PROCESS_DIR);

const fileWatherOptions = {
	CreateDirIfNotExist: true,
	fileType: [".xlsx", ".csv"],
};

pathWatcher(watcherPath, fileWatherOptions, async (file) => {
  try {
    const data = await readExcel(file); // if async
    logger.info("📊 Excel data received:\n" + JSON.stringify(data, null, 2));
    console.log(data);
  } catch (err) {
    logger.error("❌ Failed to read Excel file:", err);
  }
});

