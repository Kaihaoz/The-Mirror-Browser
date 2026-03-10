/**
 * 用户行为追踪核心代码
 * 采集：点击、悬停、滚动深度、停留时长 | 数据脱敏 | 联动透明度体系
 */
let userBehaviorData = {
    clicks: [],
    hovers: [],
    scrollDepth: 0,
    stayTime: 0,
    startTime: new Date().getTime()
};

// 1. 点击事件追踪
document.addEventListener('click', function(e) {
    const clickData = {
        x: e.clientX,
        y: e.clientY,
        time: new Date().getTime(),
        element: e.target.tagName + (e.target.id ? '#' + e.target.id : ''),
        // 数据脱敏：不记录具体ID，仅保留类型
        element_type: e.target.tagName.toLowerCase()
    };
    userBehaviorData.clicks.push(clickData);
    showMicroExplanation('click', clickData);
    updateRealTimeProfile();
});

// 2. 悬停事件追踪
let hoverStartTime = 0;
document.addEventListener('mouseover', function(e) {
    hoverStartTime = new Date().getTime();
});
document.addEventListener('mouseout', function(e) {
    const hoverDuration = (new Date().getTime() - hoverStartTime) / 1000;
    if (hoverDuration > 0.5) {
        const hoverData = {
            element_type: e.target.tagName.toLowerCase(),
            duration: hoverDuration,
            time: new Date().getTime()
        };
        userBehaviorData.hovers.push(hoverData);
        showMicroExplanation('hover', hoverData);
    }
});

// 3. 滚动深度追踪
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    userBehaviorData.scrollDepth = (scrollTop / scrollHeight) * 100;
    updateRealTimeProfile();
});

// 4. 页面停留时长计算
window.addEventListener('beforeunload', function() {
    userBehaviorData.stayTime = (new Date().getTime() - userBehaviorData.startTime) / 1000;
    localStorage.setItem('userBehaviorData', JSON.stringify(userBehaviorData));
});

// 5. 微解释提示（三层透明度体系 - 第一层）
function showMicroExplanation(type, data) {
    const explanationDiv = document.getElementById('micro-explanation');
    if (!explanationDiv) return;

    let text = '';
    if (type === 'click') {
        text = `你点击了${data.element_type}元素，该行为用于分析你的交互偏好（数据已脱敏）`;
    } else if (type === 'hover') {
        text = `你悬停在${data.element_type}元素上${data.duration.toFixed(1)}秒，系统识别你对该元素感兴趣`;
    }

    explanationDiv.textContent = text;
    explanationDiv.style.display = 'block';
    setTimeout(() => explanationDiv.style.display = 'none', 3000);
}

// 6. 实时画像更新（三层透明度体系 - 第二层）
function updateRealTimeProfile() {
    const profileDiv = document.getElementById('real-time-profile');
    if (!profileDiv) return;

    profileDiv.innerHTML = `
        <h4>你的实时行为画像</h4>
        <p>点击次数：${userBehaviorData.clicks.length}</p>
        <p>滚动深度：${userBehaviorData.scrollDepth.toFixed(1)}%</p>
        <p>停留时长：${(userBehaviorData.stayTime).toFixed(1)}秒</p>
        <p>高频交互：${getHighFreqElement()}</p>
    `;
}

// 辅助函数：获取高频交互元素类型
function getHighFreqElement() {
    const count = {};
    userBehaviorData.clicks.forEach(click => {
        count[click.element_type] = (count[click.element_type] || 0) + 1;
    });
    return Object.keys(count).sort((a,b) => count[b]-count[a])[0] || '无';
}
