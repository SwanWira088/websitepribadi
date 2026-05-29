<template>
  <div class="view-container">
    <div class="hero">
      <h1 class="title">Sidang Laporan <span>PKL</span></h1>
      <p class="subtitle">Presentasi Praktik Kerja Lapangan Tahun Ajaran 2025 / 2026</p>
      
      <div class="action-buttons">
    <router-link to="/report" class="btn btn-primary">Mulai Presentasi</router-link>
    
    <button class="btn btn-outline" @click="downloadLaporan">
      <span class="icon">📥</span> Unduh Laporan Asli
    </button>
  </div>
    </div>
  </div>
</template>

<script setup>
const downloadLaporan = () => {
const fileUrl = '/PRAMUDYAFILE.docx';

const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', 'PRAMUDYAFILE.docx'); // Nama saat file terunduh
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped>
.view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
}

.title {
  font-size: 4rem;
  margin-bottom: 10px;
}

.title span {
  background: linear-gradient(to right, #9333ea, #db2777);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #a3a3a3;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1rem;
}

.btn-primary {
  background: var(--accent-purple);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(147, 51, 234, 0.4);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 1px solid var(--accent-purple);
}

.btn-outline:hover {
  background: rgba(147, 51, 234, 0.1);
}

.icon {
  margin-right: 8px;
}

.btn-outline:hover {
  background: rgba(147, 51, 234, 0.1);
  border-color: #c084fc;
  color: #c084fc;
}
</style>