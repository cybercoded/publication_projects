import getDataFromDB from './db_connection.js';
import generatePDF from './pdf_generator.js';

(async () => {
  const data = await getDataFromDB(3);
  await generatePDF(data);
  console.log('PDF generated successfully.');
})();
