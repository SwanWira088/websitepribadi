<template>
  <div class="card-layout">
    <h2>Data Diri <span>Saya</span></h2>
    <div class="card">
      <div class="avatar-wrapper">
        <img src="../assets/potoprofilwira.png" alt="Foto Pramudya" class="profile-img" />
        <div class="glow-effect"></div>
      </div>

      <div class="info">
        <span class="tag">STUDENT</span>
        <h3>PRAMUDYA WIRA ANDHARA</h3>
        <p><strong>NIS/NISN:</strong> 0081756602</p>
        <p><strong>Sekolah:</strong> SMK Yadika Soreang</p>
        <p><strong>Sekolah Jurusan:</strong> Rekayasa Perangkat Lunak (PPLG)</p>
        <p><strong>Tempat PKL:</strong> PT. <span class="wish">Cerebrum</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-layout {
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 800;
}

h2 span {
  color: var(--accent-purple);
}

.card {
  background: var(--bg-card);
  padding: 3rem;
  border-radius: 24px;
  display: flex;
  gap: 3rem;
  align-items: center;
  border: 1px solid #262626;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  position: relative;
  overflow: hidden;
}

/* Styling Avatar/Foto Profil */
.avatar-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Supaya foto tidak gepeng */
  border-radius: 50%;
  border: 4px solid var(--accent-purple);
  position: relative;
  z-index: 2;
}

.glow-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent-purple);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.3;
  z-index: 1;
}

/* Styling Informasi */
.info {
  z-index: 2;
}

.tag {
  background: var(--accent-purple);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.info h3 {
  font-size: 2.2rem;
  margin: 15px 0 10px 0;
  font-weight: 800;
  color: #fff;
}

.info p {
  color: #a1a1aa;
  line-height: 1.8;
  margin: 8px 0;
  font-size: 1.1rem;
}

.info p strong {
  color: #e4e4e7;
}

.wish {
  font-style: italic;
  color: #c084fc;
  font-weight: bold;
}

/* Responsif untuk HP */
@media (max-width: 600px) {
  .card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
  .avatar-wrapper {
    width: 150px;
    height: 150px;
  }
}
</style>