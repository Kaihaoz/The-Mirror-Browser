# The Mirror Browser
面向算法透明度的用户行为追踪与隐私可视化交互产品

[**在线演示地址**](https://kaihaoz.github.io/The-Mirror-Browser/)

## 项目概述
本项目是基于研究性设计（Research-through-Design）方法开发的交互原型，聚焦探索「算法透明度」在浏览器产品中的落地路径。通过实时行为追踪与兴趣画像可视化，解决用户因算法“黑盒”产生的隐私焦虑问题，同时平衡隐私合规与用户体验。

## 🎯 核心功能
### ✅ 已实现功能
- 实时用户行为追踪：采集点击、悬停、滚动深度、鼠标移动数据（数据脱敏保护隐私）
- 6维度用户兴趣画像：技术 / 科学 / 生活方式 / 艺术设计 / 金融 / 游戏
- Cookie 隐私授权面板（符合隐私保护规范）
- 基础兴趣雷达图可视化：基于行为数据动态更新
- 侧边栏实时画像进度条展示
- 内容卡片搜索过滤功能

### 🚧 待优化项（复盘与改进）
- 热力图渲染效率优化（当前仅支持基础坐标展示）
- 分析面板数据导出功能完善
- 移动端响应式布局适配
- 用户测试数据统计与分析

## 📝 研究重点
1. 设计“三层透明度体系”：
   - 行为采集层：非侵入式用户行为数据获取
   - 兴趣分析层：6维度兴趣标签归一化算法
   - 可视化层：雷达图+热力图双模式展示
2. 提出6维度用户兴趣标签体系，平衡数据采集与隐私保护
3. 验证“实时可视化”对用户算法理解度的提升效果（用户测试数据待补充）

## 🔍 核心代码逻辑
### 1. 滚动深度追踪（index.html）
```javascript
addEventListener('scroll', () => {
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const depth = Math.round((window.scrollY / docHeight) * 100);
  metrics.scrollDepth = Math.max(metrics.scrollDepth, depth);
});
