const search = document.getElementById('concept-search');
const searchResult = document.getElementById('search-result');
const conceptRows = [...document.querySelectorAll('tr:has(input[type=checkbox]), [data-search]')];

search.addEventListener('input', () => {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  conceptRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const matches = terms.every(term => text.includes(term));
    row.hidden = !matches;
    if (matches) visible += 1;
  });
  searchResult.hidden = terms.length === 0;
  searchResult.textContent = `일치하는 핵심 개념 ${visible}개`;
});
