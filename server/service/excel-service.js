const fs = require('fs');
const xlsx = require('xlsx');

class ExcelService {
    async createExcelTable(req, res) {
        // const workBook = xlsx.utils.book_new();
        // const workSheet = xlsx.utils.json_to_sheet(); //here we need to give data
        // xlsx.utils.book_append_sheet(workBook, workSheet, 'the work sheet name');
        //
        // const fileName = 'orders.xlsx';
        // const workBookOptions = {bookType: 'xlsx', type: 'binary'};
        // xlsx.writeFile(workBook, fileName, workBookOptions)
        //
        // const stream = fs.createReadStream(fileName);
        // stream.pipe(res)
    }
}

module.exports = new ExcelService();