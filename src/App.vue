<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Variable reactive untuk mengontrol buka/tutup menu di HP
const isMenuOpen = ref(false)

// Fungsi untuk toggle menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Fungsi untuk menutup menu setelah link diklik
const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollProgress = ref(0)

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
<div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>

  <div class="cloud-bg">
    <div class="cloud cloud-purple-1"></div>
    <div class="cloud cloud-white"></div>
    <div class="cloud cloud-purple-2"></div>
  </div>

  <div class="app-container">
    <nav class="navbar">
      <div class="logo-container">
        <h1 class="logo"><a href="/">Pramudya Wira <span>Website</span></a></h1>
      </div>

      <div class="nav-links desktop-nav">
        <router-link to="/">Beranda</router-link>
        <router-link to="/profile">Data Diri</router-link>
        <router-link to="/class">Kelas</router-link>
        <router-link to="/school">Sekolah</router-link>
        <router-link to="/report">Laporan PKL</router-link>
        <router-link to="/gallery">Galeri Kenangan</router-link>
      </div>

      <button 
        class="hamburger" 
        :class="{ 'is-active': isMenuOpen }" 
        @click="toggleMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </nav>

    <div class="mobile-nav" :class="{ 'open': isMenuOpen }">
      <router-link to="/" @click="closeMenu">Beranda</router-link>
      <router-link to="/profile" @click="closeMenu">Data Diri</router-link>
      <router-link to="/class" @click="closeMenu">Kelas</router-link>
      <router-link to="/school" @click="closeMenu">Sekolah</router-link>
      <router-link to="/report" @click="closeMenu">Laporan PKL</router-link>
      <router-link to="/gallery" @click="closeMenu">Galeri Kenangan</router-link>
    </div>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>  
</template>

<style>
/* 1. Dark Mode: Saat class .dark-mode aktif di body */
body.dark-mode {
  --bg-app: #0a0a0a;
  --bg-card: #171717;
  --text-main: #f3f4f6;
  --accent: #9333ea; /* Ungu */
  --border-color: #262626;
}

.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--accent-purple);
  z-index: 9999;
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px var(--accent-purple);
}

/* Terapkan variabel ke elemen */
body {
  background-color: var(--bg-app);
  color: var(--text-main);
  transition: background-color 0.3s, color 0.3s;
}

/* Ganti hardcoded color di .navbar, .card, dll jadi var() */
.navbar { background: var(--bg-card); border-bottom: 1px solid var(--border-color); }
.card, .sidebar, .item-card { background: var(--bg-card) !important; border: 1px solid var(--border-color) !important; }
/* Dst... */

/* Reset dasar & Tema Obsidian Black + Purple */
:root {
  --bg-dark: #0a0a0a;
  --bg-card: #171717;
  --text-main: #f3f4f6;
  --accent-purple: #9333ea;
  --accent-hover: #a855f7;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-dark);
  color: var(--text-main);
  /* Mencegah scroll saat menu HP terbuka (opsional, tapi disarankan) */
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navbar Styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #262626;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 0;
  position: relative;
  z-index: 101; /* Supaya logo tetap di atas menu mobile */
}

.logo span {
  color: var(--accent-purple);
  text-decoration: none;
}

h1 a {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #a3a3a3;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding-bottom: 4px;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: var(--text-main);
  border-bottom: 2px solid var(--accent-purple);
  text-shadow: 0 0 10px rgba(147, 51, 234, 0.5);
}

.main-content {
  padding: 3rem 5%;
  flex: 1;
}

/* Animasi Perpindahan Halaman */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* =========================================
   STYLING KHUSUS HAMBURGER & MOBILE MENU 
   ========================================= */

/* Sembunyikan hamburger dan menu mobile di Desktop */
.hamburger {
  display: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  z-index: 101; /* Pastikan tombol di atas menu overlay */
}

.hamburger .bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: var(--text-main);
  transition: all 0.3s ease;
}

.mobile-nav {
  display: none;
}

/* --- TAMPILAN RESPONSIVE (HP) --- */
@media (max-width: 768px) {
  /* 1. Sembunyikan menu desktop */
  .desktop-nav {
    display: none;
  }

  /* 2. Tampilkan tombol hamburger */
  .hamburger {
    display: block;
  }

  /* 3. Desain Menu Layar Penuh (Overlay) untuk HP */
  .mobile-nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(10, 10, 10, 0.98); /* Hitam pekat sedikit transparan */
    backdrop-filter: blur(15px);
    z-index: 99;
    gap: 2rem;
    
    /* Animasi Slide dari kanan ke kiri */
    transform: translateX(100%);
    transition: transform 0.4s ease-in-out;
  }

  /* Ketika isMenuOpen = true, geser menu ke tengah */
  .mobile-nav.open {
    transform: translateX(0);
  }

  /* Styling link di dalam menu HP */
  .mobile-nav a {
    color: #a3a3a3;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .mobile-nav a:hover,
  .mobile-nav a.router-link-exact-active {
    color: var(--accent-purple);
    text-shadow: 0 0 15px rgba(147, 51, 234, 0.6);
  }

  /* 4. Animasi Tombol Hamburger menjadi "X" */
  .hamburger.is-active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.is-active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.is-active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}

/* =========================================
   TAMBAHAN: STYLING BACKGROUND AWAN 
   ========================================= */
.cloud-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-dark);
  z-index: -2; 
  overflow: hidden;
}

.cloud {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  mix-blend-mode: screen;
  animation: moveCloud infinite alternate ease-in-out;
}

.cloud-purple-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0) 70%);
  top: -10%;
  left: -10%;
  animation-duration: 25s;
}

.cloud-white {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%);
  bottom: -15%;
  right: -5%;
  animation-duration: 35s;
}

.cloud-purple-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0) 70%);
  bottom: 10%;
  left: 20%;
  animation-duration: 28s;
}

@keyframes moveCloud {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(100px, 60px) scale(1.15) rotate(60deg); }
  100% { transform: translate(-50px, 120px) scale(0.9) rotate(120deg); }
}
</style>