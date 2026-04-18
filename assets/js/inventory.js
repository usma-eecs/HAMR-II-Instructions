(function () {
  const searchBox = document.getElementById('searchBox');
  const table = document.getElementById('inventoryTable');
  if (!searchBox || !table) return;

  const rows = Array.from(table.querySelectorAll('tbody tr'));

  function applyInventoryFilter() {
    const q = searchBox.value.trim().toLowerCase();
    rows.forEach(row => {
      const hay = (row.dataset.search || '').toLowerCase();
      row.style.display = hay.includes(q) ? '' : 'none';
    });

    if (typeof window.closeRowHoverPreview === 'function') {
      window.closeRowHoverPreview();
    }
  }

  searchBox.addEventListener('input', applyInventoryFilter);
})();
