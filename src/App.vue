<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="logo-container">
        <h1 class="logo"><a href="#">Pramudya Wira <span>Website</span></a></h1>
      </div>
      <div class="nav-links">
        <router-link to="/">Beranda</router-link>
  <router-link to="/profile">Data Diri</router-link>
  <router-link to="/class">Kelas</router-link>
  <router-link to="/school">Sekolah</router-link>
  <router-link to="/report">Laporan PKL</router-link>
  <router-link to="/gallery">Galeri Kenangan</router-link>
      </div>
    </nav>

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
</style>