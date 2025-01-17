import { createObjectCsvWriter } from 'csv-writer';

export async function exportCSV(data, fileName) {
    const csvWriter = createObjectCsvWriter({
        path: fileName,
        header: Object.keys(data[0]).map(key => ({ id: key, title: key }))
    });

    try {
        await csvWriter.writeRecords(data);
    } catch (error) {
        throw error;
    }
}