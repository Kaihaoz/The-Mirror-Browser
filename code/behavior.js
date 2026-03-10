let metrics = {
  clickCount: 0,
  scrollDepth: 0,
  moveCount: 0,
  clickPoints: [],
  searches: []
};

// 滚动深度
addEventListener('scroll', () => {
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const depth = Math.round((window.scrollY / docHeight) * 100);
  metrics.scrollDepth = Math.max(metrics.scrollDepth, depth);
});

// 鼠标移动
let lastMM = 0;
addEventListener('mousemove', () => {
  const now = performance.now();
  if (now - lastMM > 80) {
    metrics.moveCount++;
    lastMM = now;
  }
});

// 点击热力图
document.addEventListener('click', (e) => {
  const x = e.clientX / window.innerWidth * 1000;
  const y = e.clientY / window.innerHeight * 1000;
  metrics.clickPoints.push({ x, y });
});
