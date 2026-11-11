function readProgress(key) {
  try { return JSON.parse(localStorage.getItem(key)); }
  catch { return null; }
}

function updateDashboard() {
  const checked = readProgress('sqld-study-sheet-progress-v1');
  const completed = Array.isArray(checked) ? checked.length : 0;
  document.getElementById('study-progress').firstChild.nodeValue = String(completed);

  const last = readProgress('sqld-result');
  document.getElementById('latest-score').textContent = Number.isFinite(last?.score) ? `${last.score}점` : '—';
  document.getElementById('latest-info').textContent = Array.isArray(last?.ids)
    ? `${last.ids.length}문항 중 ${last.correct}문항 정답`
    : '아직 제출한 기록이 없습니다.';
  document.getElementById('start').textContent = readProgress('sqld-session') ? '이어풀기 →' : 'CBT 시작 →';
}

window.addEventListener('pageshow', updateDashboard);
window.addEventListener('storage', updateDashboard);
