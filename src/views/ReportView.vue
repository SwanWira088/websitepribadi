<template>
  <div class="report-layout">
    <aside class="sidebar">
      <h4>Presentasi Control</h4>
      <button @click="toggleAutoScroll" class="btn-scroll">
        {{ isScrolling ? '⏸ Pause' : '▶ Auto-Scroll' }}
      </button>
      <div class="speed-control">
        <label>Speed: {{ scrollSpeed }}</label>
        <input type="range" v-model="scrollSpeed" min="1" max="10" />
      </div>
      <hr class="divider" />
      <ul>
        <li @click="scrollTo('bab1')">BAB I: Pendahuluan</li>
        <li @click="scrollTo('bab2')">BAB II: Profil Perusahaan</li>
        <li @click="scrollTo('bab3')">BAB III: Pembahasan</li>
      </ul>
    </aside>

    <section class="content">
      <div id="bab1" class="section">
        <h2>BAB I: <span>PENDAHULUAN</span></h2>
        <p>Laporan ini disusun sebagai bukti pelaksanaan Praktik Kerja Lapangan di PT. KAI Persero...</p>
        <p v-for="i in 1" :key="'p1-'+i">1.1 Tentang
<br>Hai! Selamat datang di website personal saya. Saya adalah seorang pelajar yang memiliki ketertarikan besar di dunia teknologi dan pengembangan web. Bagi saya, barisan kode bukan sekadar teks, melainkan cara untuk membangun sesuatu yang bermanfaat dan interaktif.
<br>1.2 Apa yang Saya Lakukan?
<br>Saat ini, saya sedang mendalami pengembangan web (Web Development) dengan fokus pada Vue.js. Saya senang bereksperimen dengan desain UI yang unik, transisi yang halus, dan fitur-fitur interaktif seperti yang kalian lihat di website ini.
Selain ngoding, saya juga memiliki minat pada:
Visual Art: Sering bermain dengan manipulasi foto dan image generation untuk menciptakan karya visual yang sinematik.
Dunia Otomotif: Menyukai kustomisasi kendaraan, terutama motor yang memiliki karakter khas dan klasik.
<br>1.3 Tentang Proyek Ini
<br>Website ini dibangun menggunakan Vue 3 dan Vite. Di sini, saya mendokumentasikan perjalanan belajar saya, mulai dari proyek sekolah hingga eksperimen pribadi. Fitur Auto-Scroll yang ada di samping adalah salah satu hasil eksperimen saya agar membaca konten terasa lebih santai (dan keren tentunya!).</p>
      </div>
      
      <div id="bab2" class="section">
        <h2>BAB II: <span>PROFIL PERUSAHAAN</span></h2>
        <p>PT Kereta Api Indonesia (Persero) adalah penyedia jasa transportasi kereta api utama di Indonesia...</p>
        <p v-for="i in 1" :key="'p2-'+i">Detail profil perusahaan, visi, misi, dan struktur organisasi tempat kamu PKL bisa diletakkan di bagian ini.</p>
      </div>

      <div id="bab3" class="section">
        <h2>BAB III: <span>PEMBAHASAN</span></h2>
        <p>Selama PKL di divisi terkait, saya mempelajari sistem kerja dan teknologi yang digunakan...</p>
        <p v-for="i in 15" :key="'p3-'+i">Bagian ini adalah inti dari presentasi kamu. Jelaskan apa saja yang kamu kerjakan dan hasil yang dicapai.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const scrollSpeed = ref(2);
const isScrolling = ref(false);
let scrollInterval: any = null;

// Fungsi Navigasi (Hanya perlu SATU deklarasi)
const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// Fungsi Auto-Scroll
const toggleAutoScroll = () => {
  if (isScrolling.value) {
    clearInterval(scrollInterval);
    isScrolling.value = false;
  } else {
    isScrolling.value = true;
    scrollInterval = setInterval(() => {
      window.scrollBy({
        top: Number(scrollSpeed.value),
        behavior: 'auto'
      });
      
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        clearInterval(scrollInterval);
        isScrolling.value = false;
      }
    }, 50);
  }
};

onUnmounted(() => {
  clearInterval(scrollInterval);
});
</script>

<style scoped>
.report-layout {
  display: flex;
  gap: 3rem;
  padding: 20px;
}

.sidebar {
  width: 260px;
  position: sticky;
  top: 100px;
  height: fit-content;
  background: #171717;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #262626;
}

.btn-scroll {
  width: 100%;
  padding: 12px;
  background: var(--accent-purple, #9333ea);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;
}

.speed-control {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.divider { border: 0.5px solid #262626; margin: 1rem 0; }

.content {
  flex: 1;
  font-size: 1.25rem;
  line-height: 2;
  color: #e4e4e7;
}

.section { margin-bottom: 8rem; }

h2 span { color: #9333ea; }

ul { list-style: none; padding: 0; }
li { 
  padding: 10px 0;
  cursor: pointer;
  color: #a1a1aa;
  transition: 0.3s;
}
li:hover { color: #9333ea; padding-left: 5px; }
</style>