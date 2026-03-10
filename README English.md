# The Mirror Browser
🔗 **Live Demo**: https://your-username.github.io/The-Mirror-Browser/

## Project Overview
This project is an interactive prototype developed based on the Research-through-Design methodology, focusing on exploring the implementation path of "algorithmic transparency" in browser products. It aims to solve users' privacy anxiety caused by "black-box" algorithms through real-time behavior tracking and interest profile visualization, while balancing privacy compliance and user experience.

## 🎯 Core Features
### ✅ Implemented Functions
- Real-time user behavior tracking: Collect clicks, hovers, scroll depth, and mouse movement data (with data desensitization to protect privacy)
- 6-dimensional user interest profiling: Technology / Science / Lifestyle / Art & Design / Finance / Gaming
- Cookie privacy authorization panel (compliant with privacy protection norms)
- Basic interest radar chart visualization: Dynamically updated based on behavioral data
- Real-time profile progress bar display in sidebar
- Search filtering function for content cards

### 🚧 To Be Optimized (Reflection & Improvement)
- Heatmap rendering efficiency optimization (basic coordinate display only at present)
- Improvement of data export function in analysis panel
- Mobile responsive layout adaptation
- User testing data statistics and analysis

## 📝 Research Focus
1. Designed a "three-layer transparency system": 
   - Behavior collection layer: Non-intrusive user behavior data acquisition
   - Interest analysis layer: 6-dimensional interest tag normalization algorithm
   - Visualization layer: Radar chart + heatmap dual-mode display
2. Proposed a 6-dimensional user interest tag system to balance data collection and privacy protection
3. Verified the improvement effect of "real-time visualization" on users' algorithm understanding (user test data to be supplemented)

## 🔍 Key Code Logic
### 1. Scroll Depth Tracking (index.html)
```javascript
addEventListener('scroll', () => {
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const depth = Math.round((window.scrollY / docHeight) * 100);
  metrics.scrollDepth = Math.max(metrics.scrollDepth, depth);
});
