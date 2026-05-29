<template>
  <div class="school-layout">
    <h2>Identitas <span>Sekolah</span></h2>
    <div class="content-grid">
      <div class="text-content">
        <h3>SMK Yadika Soreang</h3>
        <p>Laporan ini disusun sebagai salah satu syarat ketuntasan Praktik Kerja Lapangan (PKL) pada program keahlian yang ditekuni.</p>
        <ul>
          <li><strong>Alamat:</strong> Jl. Bojongkoneng, Kp. Karang Anyar, RT 04/05, Cingcin, Kec. Soreang, Kabupaten Bandung, Jawa Barat.</li>
          <li><strong>Kepala Sekolah:</strong> Ibu Yeti Nuraeni</li>
          <li><strong>Pembimbing:</strong> ...</li>
          <li><strong>Jurusan:</strong> Perhotelan, <i><b>PPLG</b></i>, Akutansi</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.school-layout {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

h2 span {
  color: var(--accent-purple);
}

.content-grid {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #262626;
  border-left: 4px solid var(--accent-purple);
}

.text-content h3 {
  font-size: 1.8rem;
  margin-top: 0;
}

.text-content ul {
  list-style-type: none;
  padding: 0;
}

.text-content li {
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
}
</style>