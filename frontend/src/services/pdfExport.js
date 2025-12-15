/**
 * PDF Export utility for SimplifiED lectures
 * Generates professional PDF with all processed lecture data
 */

export async function generateLecturePDF(lectureData) {
  try {
    // Dynamic import to avoid build issues
    const jsPDF = (await import('jspdf')).jsPDF;
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to add section with wrapping text
    const addSection = (title, content) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }

      // Section title
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(30, 58, 138); // Dark blue
      doc.text(title, margin, yPosition);
      yPosition += 10;

      // Section content
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(50, 50, 50); // Dark gray

      // Handle long text with word wrapping
      const lines = doc.splitTextToSize(content, maxWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 6 + 8;

      return yPosition;
    };

    // Header with logo/branding
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(30, 58, 138); // Dark blue
    doc.text('SimplifiED', margin, yPosition);
    yPosition += 12;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(100, 100, 100); // Gray
    doc.text('Lecture Notes & Analysis Report', margin, yPosition);
    yPosition += 15;

    // Divider line
    doc.setDrawColor(30, 58, 138);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    // Metadata
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(80, 80, 80);
    
    const createdDate = lectureData.createdAt 
      ? new Date(lectureData.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : new Date().toLocaleDateString();

    doc.text(`Generated: ${createdDate}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Document ID: ${lectureData.id || 'N/A'}`, margin, yPosition);
    yPosition += 15;

    // Main content sections
    if (lectureData.transcription) {
      yPosition = addSection('Original Transcription', lectureData.transcription);
    }

    if (lectureData.simpleText) {
      yPosition = addSection('Simplified Breakdown', lectureData.simpleText);
    }

    if (lectureData.detailedSteps) {
      yPosition = addSection('Detailed Steps', lectureData.detailedSteps);
    }

    if (lectureData.mindMap) {
      yPosition = addSection('Mind Map', lectureData.mindMap);
    }

    if (lectureData.summary) {
      yPosition = addSection('Summary', lectureData.summary);
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Page number
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      );

      // Footer line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    }

    // Generate filename with timestamp
    const fileName = `SimplifiED_Lecture_${new Date().toISOString().split('T')[0]}.pdf`;

    // Save the PDF
    doc.save(fileName);
    return { success: true, fileName };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}

/**
 * Alternative: Generate PDF using canvas (for complex layouts)
 * This captures the actual rendered content
 */
export async function generateLecturePDFFromDOM(elementId, lectureTitle = 'SimplifiED_Lecture') {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).jsPDF;

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Capture element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - 20;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `${lectureTitle}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    return { success: true, fileName };
  } catch (error) {
    console.error('Error generating PDF from DOM:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}
