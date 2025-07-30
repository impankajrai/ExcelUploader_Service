import xlsx from 'xlsx';

const readExcel=(file)=>{
const workbook = xlsx.readFile(file);
const sheet = workbook.SheetNames[0];
 const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
 return data;

}

export default readExcel;