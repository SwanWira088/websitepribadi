<template>
  <div class="class-container">
    <div class="header-section">
      <h2>Data <span>My Friend</span> In Class</h2>
      <p class="badge">XI PPLG 2</p>
      <p class="badge">Total: {{ students.length }} Siswa</p>
    </div>

    <div class="student-grid">
      <div v-for="student in students" :key="student.id" class="student-card">
        <div class="student-info">
          <div class="absen-circle">{{ student.noAbsen }}</div>
          <h4>{{ student.nama }}</h4>
          <span class="status-tag">Murid PPLG 2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const students = ref([
  { id: 1, noAbsen: 1, nama: 'Alifa Aprilyanti W' },
  { id: 2, noAbsen: 2, nama: 'Arvin Ferdian' },
  { id: 3, noAbsen: 3, nama: 'Azwar Nurul H' },
  { id: 4, noAbsen: 4, nama: 'D saefulloh' },
  { id: 5, noAbsen: 5, nama: 'Dhiyya Ayu Maisaan' },
  { id: 6, noAbsen: 6, nama: 'Dicky Abdul R' },
  { id: 7, noAbsen: 7, nama: 'Farhan Al-Farizi' },
  { id: 8, noAbsen: 8, nama: 'Fauzan Seva N' },
  { id: 9, noAbsen: 9, nama: 'Gio Maulana' },
  { id: 10, noAbsen: 10, nama: 'Kahfi Rahmatulloh' },
  { id: 11, noAbsen: 11, nama: 'Kanzi Cibil P' },
  { id: 12, noAbsen: 12, nama: 'Midza Prada Al G' },
  { id: 13, noAbsen: 13, nama: 'Muhammad Abdul' },
  { id: 14, noAbsen: 14, nama: 'Muhammad Luthfi' },
  { id: 15, noAbsen: 15, nama: 'Muhammad Nabil' },
  { id: 16, noAbsen: 16, nama: 'Muhammad Rizqy' },
  { id: 17, noAbsen: 17, nama: 'Muhammad Yogi P' },
  { id: 18, noAbsen: 18, nama: 'Muhammad Adeng' },
  { id: 19, noAbsen: 19, nama: 'Muhammad Hanif S' },
  { id: 20, noAbsen: 20, nama: 'Nabil Ramdan A' },
  { id: 21, noAbsen: 21, nama: 'Nazwa Nurahma F' },
  { id: 22, noAbsen: 22, nama: 'Nizam Fauzan' },
  { id: 23, noAbsen: 23, nama: 'Nur Fitri K' },
  { id: 24, noAbsen: 24, nama: 'Pramudya Wira A' },
  { id: 25, noAbsen: 25, nama: 'Rafly Rodiansyah' },
  { id: 26, noAbsen: 26, nama: 'Rahmat Rizal Alfauzi' },
  { id: 27, noAbsen: 27, nama: 'Rahmi Nurfazriah' },
  { id: 28, noAbsen: 28, nama: 'Raissa Adhi Pratama' },
  { id: 29, noAbsen: 29, nama: 'Reditya Adha Y' },
  { id: 30, noAbsen: 30, nama: 'Reisya Mutiara R' },
  { id: 31, noAbsen: 31, nama: 'Rika Riski Nopiani' },
  { id: 32, noAbsen: 32, nama: 'Salsa Nur Afifah R' },
  { id: 33, noAbsen: 33, nama: 'Teddy Heryawan' },
  { id: 34, noAbsen: 34, nama: 'Topik Hermawan' }
]);
</script>

<style scoped>
.class-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

h2 span {
  color: var(--accent-purple);
}

.badge {
  display: inline-block;
  background: rgba(147, 51, 234, 0.1);
  color: #c084fc;
  padding: 5px 15px;
  border-radius: 30px;
  border: 1px solid rgba(147, 51, 234, 0.3);
  font-size: 0.9rem;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
}

.student-card {
  background: #171717;
  border: 1px solid #262626;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.student-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-purple);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.absen-circle {
  width: 35px;
  height: 35px;
  background: var(--accent-purple);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

h4 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-tag {
  font-size: 0.7rem;
  color: #737373;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>