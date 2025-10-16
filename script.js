(function(){
  const form = document.getElementById('briefForm');
  const fields = {
    brand: form.brand,
    background: form.background,
    audience: form.audience,
    goal: form.goal,
    concept: form.concept,
    scope: form.scope,
    media: form.media,
    deadline: form.deadline
  };

  const v = {
    brand: document.getElementById('vBrand'),
    background: document.getElementById('vBackground'),
    audience: document.getElementById('vAudience'),
    goal: document.getElementById('vGoal'),
    concept: document.getElementById('vConcept'),
    scope: document.getElementById('vScope'),
    media: document.getElementById('vMedia'),
    deadline: document.getElementById('vDeadline')
  };

  function updatePreview() {
    v.brand.textContent = fields.brand.value || 'Nama Brand';
    v.background.textContent = fields.background.value || '—';
    v.audience.textContent = fields.audience.value || '—';
    v.goal.textContent = fields.goal.value || '—';
    v.concept.textContent = fields.concept.value || '—';
    v.scope.textContent = fields.scope.value || '—';
    v.media.textContent = fields.media.value || '—';

    if (fields.deadline.value) {
      const date = new Date(fields.deadline.value);
      const formatted = date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      v.deadline.textContent = formatted;
    } else {
      v.deadline.textContent = '—';
    }
  }

  Object.values(fields).forEach(f => f.addEventListener('input', updatePreview));
  updatePreview();

  async function exportPNG() {
    const node = document.getElementById('briefDoc');
    const canvas = await html2canvas(node, { scale: 2, useCORS: true });
    canvas.toBlob(function(blob){
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (fields.brand.value || 'brief') + '.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  async function exportPDF() {
    const node = document.getElementById('briefDoc');
    const canvas = await html2canvas(node, { scale: 2, useCORS: true });
    const img = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p','mm','a4');
    const w = 210;
    const h = 297;
    pdf.addImage(img,'PNG',0,0,w,h);
    pdf.save((fields.brand.value || 'brief') + '.pdf');
  }

  document.getElementById('exportPdf').addEventListener('click', exportPDF);
  document.getElementById('exportPng').addEventListener('click', exportPNG);
  document.getElementById('resetBtn').addEventListener('click', () => {
    setTimeout(updatePreview, 50);
  });
})();