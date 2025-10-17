const briefForm = document.getElementById('briefForm');

// Mapping ID preview
const previewIds = {
  brand: 'vBrand',
  background: 'vBackground',
  audience: 'vAudience',
  goal: 'vGoal',
  concept: 'vConcept',
  scope: 'vScope',
  media: 'vMedia',
  deadline: 'vDeadline'
};

// Default preview jika form kosong
const defaultValues = {
  brand: 'Brand',
  background: '-',
  audience: '-',
  goal: '-',
  concept: '-',
  scope: '-',
  media: '-',
  deadline: '-'
};

// Format datetime-local ke string readable
function formatDateTime(value) {
  if (!value) return '';
  const d = new Date(value);
  return d.toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

// Update preview otomatis
function updatePreview() {
  Object.keys(previewIds).forEach(key => {
    const el = document.getElementById(previewIds[key]);
    let val = briefForm[key]?.value.trim() || '';
    if (!val) val = defaultValues[key];
    if (key === 'deadline') val = formatDateTime(val);
    el.textContent = val;
  });
}

// Event listener
briefForm.addEventListener('input', updatePreview);
document.getElementById('resetBtn').addEventListener('click', () => setTimeout(updatePreview, 0));

// Export PDF (A4)
document.getElementById('exportPdf').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('portrait', 'pt', 'a4');
  const element = document.getElementById('briefDoc');

  // Hitung skala agar A4
  html2canvas(element, { scale:2, useCORS:true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    doc.save('brief-design.pdf');
  });
});

// Export PNG (A4)
document.getElementById('exportPng').addEventListener('click', () => {
  const element = document.getElementById('briefDoc');
  html2canvas(element, { scale:2, useCORS:true }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'brief-design.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});

// Inisialisasi preview
updatePreview();
