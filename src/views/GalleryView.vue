<template>
  <div class="gallery-container">
    <transition name="fade">
      <div v-if="!isLoggedIn" class="login-screen">
        <div class="login-card">
          <div class="brand">Gallery Pramudya Wira</div>
          <h2>PORTAL LOGIN</h2>
          <div class="login-form">
            <input v-model="loginData.username" type="text" placeholder="Username" class="input-field" />
            <input v-model="loginData.password" type="password" placeholder="Password" class="input-field" />
            
            <div class="hint-box">
              <p>usn: tamu | pw: user123</p>
            </div>

            <button @click="handleLogin" class="btn-auth">LOGIN</button>
            
            <button @click="goBackHome" class="btn-exit">Back to Home</button>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="isLoggedIn" class="main-wrapper">
      <nav class="navbar">
        <div class="nav-content">
          <div class="nav-left">
            <button v-if="selectedAlbum" @click="selectedAlbum = null" class="btn-back">← Back</button>
            <h1 class="title">{{ selectedAlbum ? selectedAlbum.name : 'Archive' }}</h1>
          </div>
          <div class="nav-right">
            <button v-if="currentUser.role === 'admin'" @click="showModal = true" class="btn-add">
              + {{ selectedAlbum ? 'Photo' : 'Album' }}
            </button>
            <div class="user-info" @click="handleLogout">
              <span class="status-dot"></span> {{ currentUser.username }} / <i>logout</i>
            </div>
          </div>
        </div>
      </nav>

      <main class="gallery-view">
        <div v-if="!selectedAlbum" class="grid-layout">
          <div v-for="album in albums" :key="album.id" class="item-card" @click="selectedAlbum = album">
            <button v-if="currentUser.role === 'admin'" class="btn-delete" @click.stop="deleteAlbum(album.id)">×</button>
            <div class="image-wrapper">
              <img :src="album.cover" />
              <div class="image-overlay">View Collection</div>
            </div>
            <div class="item-info">
              <h3>{{ album.name }}</h3>
              <p>{{ album.photos.length }} Items</p>
            </div>
          </div>
        </div>

        <div v-else class="grid-layout">
          <div v-for="(photo, index) in selectedAlbum.photos" :key="index" class="item-card photo-card">
            <button v-if="currentUser.role === 'admin'" class="btn-delete" @click.stop="deletePhoto(index)">×</button>
            <img :src="photo" class="photo-img" @click="previewImage = photo" />
          </div>
        </div>
      </main>
    </div>

    <transition name="pop">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">
          <div class="modal-header">
            <h3>{{ selectedAlbum ? 'Tambah Foto' : 'Koleksi Baru' }}</h3>
            <button @click="closeModal" class="btn-close">×</button>
          </div>
          <div class="modal-body">
            <div class="drop-zone" @click="$refs.fileInput.click()">
              <img v-if="previewUrl" :src="previewUrl" class="preview-img" />
              <div v-else class="drop-text">
                <p>Klik Disini Untuk Menambah Foto</p>
              </div>
              <input type="file" ref="fileInput" hidden @change="onFileChange" accept="image/*" />
            </div>
            <input v-model="newTitle" type="text" placeholder="Masukkan Judul" class="input-field" />
            <button @click="handleSave" class="btn-save">Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="previewImage" class="lightbox" @click="previewImage = null">
        <img :src="previewImage" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'; // Tambahkan ini jika pakai router

const router = useRouter(); // Inisialisasi router
const isLoggedIn = ref(false);
const currentUser = ref(null);
const loginData = ref({ username: '', password: '' });
const albums = ref([]);
const selectedAlbum = ref(null);
const showModal = ref(false);
const previewUrl = ref(null);
const newTitle = ref('');
const previewImage = ref(null);

const USERS = {
  admin: { username: 'Pramudya admin', password: 'hanya123admin', role: 'admin' },
  tamu: { username: 'tamu', password: 'user123', role: 'guest' }
};

// Fungsi navigasi keluar
const goBackHome = () => {
  // Jika pakai vue-router
  if (router) {
    router.push('/');
  } else {
    // Jika tidak pakai router, redirect manual
    window.location.href = '/';
  }
};

const handleLogin = () => {
  const user = Object.values(USERS).find(u => u.username === loginData.value.username && u.password === loginData.value.password);
  if (user) {
    isLoggedIn.value = true;
    currentUser.value = user;
    localStorage.setItem('ptsr_session', JSON.stringify(user));
  } else {
    alert("Akses Ditolak, Username / Password salah");
  }
};

const handleLogout = () => {
  if(confirm("Logout Dari Portal?")) {
    isLoggedIn.value = false;
    currentUser.value = null;
    localStorage.removeItem('ptsr_session');
  }
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => previewUrl.value = ev.target.result;
    reader.readAsDataURL(file);
  }
};

const handleSave = () => {
  if (!previewUrl.value || !newTitle.value) return alert("Tolong Masukkan Ini");
  if (selectedAlbum.value) {
    selectedAlbum.value.photos.unshift(previewUrl.value);
  } else {
    albums.value.unshift({
      id: Date.now(),
      name: newTitle.value,
      cover: previewUrl.value,
      photos: [previewUrl.value]
    });
  }
  closeModal();
};

const closeModal = () => {
  showModal.value = false;
  previewUrl.value = null;
  newTitle.value = '';
};

const deleteAlbum = (id) => {
  if (confirm("Hapus Koleksi Ini?")) albums.value = albums.value.filter(a => a.id !== id);
};

const deletePhoto = (index) => {
  if (confirm("Hapus Foto Ini?")) selectedAlbum.value.photos.splice(index, 1);
};

onMounted(() => {
  const session = localStorage.getItem('ptsr_session');
  if (session) {
    isLoggedIn.value = true;
    currentUser.value = JSON.parse(session);
  }
  const savedData = localStorage.getItem('ptsr_data');
  if (savedData) albums.value = JSON.parse(savedData);
});

watch(albums, (newVal) => {
  localStorage.setItem('ptsr_data', JSON.stringify(newVal));
}, { deep: true });
</script>

<style scoped>
/* RESET & BASE */
.gallery-container {
  min-height: 100vh;
  background: #050505;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

/* LOGIN */
.login-screen {
  position: fixed;
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.login-card {
  background: #0f0f0f;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #222;
  text-align: center;
  width: 340px;
}
.brand { color: #a855f7; font-weight: 800; letter-spacing: 4px; margin-bottom: 10px; }
.hint-box { margin-bottom: 15px; font-size: 0.8rem; color: #666; }

.input-field {
  width: 100%;
  padding: 12px;
  background: #000;
  border: 1px solid #333;
  color: #fff;
  border-radius: 12px;
  margin-bottom: 15px;
  outline: none;
}
.btn-auth {
  width: 100%;
  padding: 12px;
  background: #a855f7;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.btn-auth:hover { background: #9333ea; }

/* TOMBOL EXIT BARU */
.btn-exit {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: transparent;
  color: #888;
  border: 1px solid #333;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
}
.btn-exit:hover { background: #1a1a1a; color: #fff; border-color: #555; }

/* NAVBAR */
.navbar {
  position: sticky;
  top: 0;
  background: rgba(5, 5, 5, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #111;
  padding: 15px 5%;
  z-index: 1000;
}
.nav-content { display: flex; justify-content: space-between; align-items: center; }
.nav-left { display: flex; align-items: center; gap: 15px; }
.title { font-size: 1.2rem; font-weight: 700; }
.btn-back { background: #111; border: 1px solid #333; color: #fff; padding: 6px 12px; border-radius: 8px; cursor: pointer; }

.nav-right { display: flex; align-items: center; gap: 20px; }
.btn-add { background: #fff; color: #000; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.user-info { font-size: 0.8rem; color: #888; display: flex; align-items: center; gap: 8px; cursor: pointer; }
.status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }

/* GRID LAYOUT */
.gallery-view { padding: 40px 5%; }
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}
.item-card {
  background: #0f0f0f;
  border-radius: 16px;
  border: 1px solid #1a1a1a;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
}
.item-card:hover { transform: translateY(-5px); border-color: #a855f7; }

.image-wrapper { aspect-ratio: 4/3; position: relative; overflow: hidden; }
.image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
.image-overlay {
  position: absolute; inset: 0; background: rgba(168, 85, 247, 0.2);
  display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s;
}
.item-card:hover .image-overlay { opacity: 1; }

.item-info { padding: 15px; text-align: center; }
.item-info h3 { font-size: 1rem; margin-bottom: 5px; }
.item-info p { font-size: 0.8rem; color: #555; }

/* PHOTO CARD */
.photo-card { aspect-ratio: 1; }
.photo-img { width: 100%; height: 100%; object-fit: cover; }

/* ACTIONS */
.btn-delete {
  position: absolute; top: 10px; right: 10px; z-index: 10;
  background: rgba(255, 0, 0, 0.6); color: #fff; border: none;
  width: 25px; height: 25px; border-radius: 50%; cursor: pointer;
}

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.8);
  display: flex; align-items: center; justify-content: center; z-index: 3000;
}
.modal-box {
  background: #0f0f0f; padding: 30px; border-radius: 20px;
  width: 360px; border: 1px solid #333;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-close { background: transparent; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
.drop-zone {
  width: 100%; height: 180px; border: 2px dashed #333;
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; margin-bottom: 20px; overflow: hidden;
}
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.btn-save { width: 100%; padding: 12px; background: #a855f7; color: #fff; border: none; border-radius: 12px; font-weight: bold; cursor: pointer; }

/* LIGHTBOX */
.lightbox {
  position: fixed; inset: 0; background: rgba(0,0,0,0.95);
  display: flex; align-items: center; justify-content: center; z-index: 4000;
}
.lightbox img { max-width: 90%; max-height: 90%; border-radius: 8px; }

/* ANIMATIONS */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.pop-enter-active { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s; }
.pop-enter-from { transform: scale(0.8); opacity: 0; }
</style>