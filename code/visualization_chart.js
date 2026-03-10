/**
 * Chart.js 可视化核心代码
 * 实现：点击热力图、兴趣雷达图 | 数据可视化渲染
 */
window.addEventListener('load', function() {
    // 从本地存储读取行为数据
    const behaviorData = JSON.parse(localStorage.getItem('userBehaviorData')) || {
        clicks: [],
        hovers: [],
        scrollDepth: 0,
        stayTime: 0
    };

    // 初始化可视化图表
    initClickHeatmap(behaviorData.clicks);
    initInterestRadar(behaviorData);
});

// 1. 点击热力图（散点图模拟）
function initClickHeatmap(clicks) {
    const ctx = document.getElementById('clickHeatmap').getContext('2d');
    const heatmapData = clicks.map(click => ({
        x: click.x,
        y: window.innerHeight - click.y,
        r: 8 + Math.random() * 4 // 随机大小增强热力感
    }));

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '点击位置',
                data: heatmapData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: '页面X坐标' },
                    min: 0,
                    max: window.innerWidth
                },
                y: {
                    title: { display: true, text: '页面Y坐标' },
                    min: 0,
                    max: window.innerHeight
                }
            },
            plugins: {
                title: { display: true, text: '页面点击热力分布' }
            }
        }
    });
}

// 2. 兴趣雷达图
function initInterestRadar(behaviorData) {
    const ctx = document.getElementById('interestRadar').getContext('2d');
    // 元素类型分类统计
    const categories = ['button', 'a', 'p', 'img', 'div'];
    const values = categories.map(type => {
        // 统计点击+悬停总次数
        const clickCount = behaviorData.clicks.filter(c => c.element_type === type).length;
        const hoverCount = behaviorData.hovers.filter(h => h.element_type === type).length;
        return clickCount + hoverCount;
    });

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['按钮', '链接', '文本', '图片', '其他'],
            datasets: [{
                label: '交互次数（兴趣度）',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: Math.max(...values) + 2,
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                title: { display: true, text: '元素类型兴趣雷达图' }
            }
        }
    });
}
