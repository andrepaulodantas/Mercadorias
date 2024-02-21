import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePdf = (formList) => {
  const doc = new jsPDF();

  // Adicione um título ao PDF
  doc.setFontSize(18);
  doc.text('Relatório de Formulários', 10, 10);

  // Definir as colunas e os dados da tabela
  const columns = ["ID", "Campo1", "Campo2", "Campo3"]; // Substitua pelos nomes dos seus campos
  const tableData = formList.map(item => [item.id, item.campo1, item.campo2, item.campo3]); // Mapeie seus dados aqui

  // Adicionar uma tabela ao PDF
  doc.autoTable(columns, tableData, {
    startY: 20
  });

  // Salvar o PDF
  doc.save('formListReport.pdf');
};

export default generatePdf;
