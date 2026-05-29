<template>
  <div class="report-wrapper">
    <div class="reading-progress" :style="{ width: scrollProgress + '%' }"></div>

    <div class="report-layout">
      <aside class="sidebar">
        <h4 class="sidebar-title">Presentasi Control</h4>
        <button @click="toggleAutoScroll" class="btn-scroll">
          {{ isScrolling ? '⏸ Pause' : '▶ Auto-Scroll' }}
        </button>
        <div class="speed-control">
          <label>Speed: {{ scrollSpeed }}</label>
          <input type="range" v-model="scrollSpeed" min="1" max="10" />
        </div>
        <hr class="divider" />
        <ul class="chapter-list">
          <li @click="scrollTo('bab1')">BAB I: Pendahuluan</li>
          <li @click="scrollTo('bab2')">BAB II: Profil Perusahaan</li>
          <li @click="scrollTo('bab3')">BAB III: Pembahasan</li>
        </ul>
      </aside>

      <section class="content">
        <div id="bab1" class="section">
          <h2>BAB I: <span>PENDAHULUAN</span></h2>
          <p>1.1 Tentang<br>Hai! Selamat datang di website personal saya. Saya adalah seorang pelajar yang memiliki ketertarikan besar di dunia teknologi dan pengembangan web.</p>
          <p>1.2 Apa yang Saya Lakukan?<br>Saat ini, saya sedang mendalami pengembangan web (Web Development) dengan fokus pada Vue.js.</p>
        </div>
        
        <div id="bab2" class="section">
          <h2>BAB II: <span>PROFIL PERUSAHAAN</span></h2>
          <p>____________________________</p>
        </div>

        <div id="bab3" class="section">
          <h2>BAB III: <span>PEMBAHASAN</span></h2>
          <p>_________________________</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const scrollSpeed = ref(2);
const isScrolling = ref(false);
let scrollInterval: ReturnType<typeof setInterval> | null = null;
const scrollProgress = ref(0);
const isComponentActive = ref(true);

const updateProgress = () => {
  if (!isComponentActive.value) return;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight > 0) {
    scrollProgress.value = (window.scrollY / totalHeight) * 100;
  }
};

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    if (isScrolling.value) toggleAutoScroll();
    const y = element.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const toggleAutoScroll = () => {
  if (isScrolling.value) {
    if (scrollInterval) clearInterval(scrollInterval);
    isScrolling.value = false;
  } else {
    isScrolling.value = true;
    scrollInterval = setInterval(() => {
      if (!isComponentActive.value) {
        if (scrollInterval) clearInterval(scrollInterval);
        return;
      }
      window.scrollBy({ top: Number(scrollSpeed.value), behavior: 'auto' });
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        if (scrollInterval) clearInterval(scrollInterval);
        isScrolling.value = false;
      }
    }, 50);
  }
};

onMounted(() => {
  isComponentActive.value = true;
  window.addEventListener('scroll', updateProgress);
});

onUnmounted(() => {
  isComponentActive.value = false;
  if (scrollInterval) clearInterval(scrollInterval);
  window.removeEventListener('scroll', updateProgress);
});
</script>

<style scoped>
/* Wrapper untuk memastikan Vue Transition tidak error */
.report-wrapper { width: 100%; }

.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #9333ea, #a855f7);
  z-index: 99; 
  transition: width 0.1s ease-out;
}

.report-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 3rem;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.sidebar {
  width: 260px;
  position: sticky;
  top: 100px;
  background: rgba(23, 23, 23, 0.75);
  backdrop-filter: blur(12px);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(38, 38, 38, 0.7);
  box-sizing: border-box; 
}

.btn-scroll {
  width: 100%;
  padding: 12px;
  background: #9333ea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
}

.speed-control { margin-bottom: 1.5rem; font-size: 0.9rem; color: #e4e4e7; }
.speed-control input { width: 100%; margin-top: 8px; }

.chapter-list { list-style: none; padding: 0; margin: 0; }
.chapter-list li { padding: 10px 0; color: #a1a1aa; transition: 0.3s; cursor: pointer; }
.chapter-list li:hover { color: #9333ea; padding-left: 5px; }

.content { flex: 1; font-size: 1.15rem; line-height: 2; color: #e4e4e7; }
.section { margin-bottom: 6rem; }
h2 span { color: #9333ea; }

@media (max-width: 768px) {
  .report-layout { flex-direction: column; gap: 1.5rem; padding: 10px; }
  .sidebar { width: 100%; position: sticky; top: 60px; z-index: 90; padding: 15px; }
  .sidebar-title { display: none; }
  .chapter-list { display: flex; overflow-x: auto; gap: 20px; padding-bottom: 5px; }
  .chapter-list li { padding: 0; font-size: 0.95rem; }
}
</style>