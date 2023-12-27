<template>
  <div>
    <div class="w3-sidebar w3-light-grey w3-bar-block" style="width:25%">
        <h3 class="w3-bar-item">Menu</h3>
        <a href="/dashboard" class="w3-bar-item w3-button">Dashboard</a>
        <a href="/matkul" class="w3-bar-item w3-button">Data Matakuliah</a>
        <a href="/mahasiswa" class="w3-bar-item w3-button">Data Mahasiswa</a>
        <a href="/krsan" class="w3-bar-item w3-button">Data KRS</a>
        <a href="/detil" class="w3-bar-item w3-button">Data Detail KRS</a>
    </div>

    <!-- Page Content -->
    <div style="margin-left:25%">

    <div class="w3-container w3-blue">
    <h1>Dashboard</h1>
    </div>

    <!-- Konten Utama -->
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="container">
            <h1>Edit Mahasiswa</h1>

            <form @submit.prevent="simpan()">
              <div class="mb-3">
                <label for="nim" class="form-label">NIM</label>
                <input type="text" class="form-control" id="nim" v-model="Mahasiswa.nim">
              </div>
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input type="text" class="form-control" id="nama" v-model="Mahasiswa.nama">
              </div>
              <div class="mb-3">
                <label for="alamat" class="form-label">Alamat</label>
                <input type="text" class="form-control" id="alamat" v-model="Mahasiswa.alamat">
              </div>
              <div class="mb-3">
                <label for="tanggal_lahir" class="form-label">Tanggal Lahir</label>
                <input type="date" class="form-control" id="tanggal_lahir" v-model="Mahasiswa.lahir">
              </div>
              <div class="mb-3">
                <label for="agama" class="form-label">Agama</label>
                <select class="form-select" id="agama" v-model="Mahasiswa.agama_id">
                  <option v-for="agama in agamaList" :key="agama.id" :value="agama.id">{{ agama.agama }}</option>
                </select>
              </div>

                <div class="mb-3">
                    <button type="submit" class="btn btn-info">Simpan Perubahan</button>
                    <router-link to="/mahasiswa" class="btn btn-danger">Kembali</router-link>
                </div>
            </form>
        </div>
    </main>
  </div>
  </div>
</template>



<script>
import axios from 'redaxios'; // Pastikan bahwa Anda mengimport axios

export default {
  name: 'EditMahasiswa',
  data() {
    return {
      mahasiswaId: this.$route.params.id,
      agamaList: [],
      Mahasiswa: {
        'id': '',
        'nim': '',
        'nama': '',
        'alamat': '',
        'lahir': '',
        'agama_id': ''
      }
    };
  },
  created() {
    // Ambil data mahasiswa yang akan diedit menggunakan ID dari URL atau properti lainnya
    this.fetchMahasiswaData();
    this.loadAgamaList();
  },
  methods: {
    fetchMahasiswaData() {
      var url = `http://127.0.0.1:8000/api/mahasiswa/${this.mahasiswaId}`;
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.Mahasiswa = data;
      });
    },
    simpan() {
      var url = `http://127.0.0.1:8000/api/mahasiswa/${this.Mahasiswa.id}`;
      axios.put(url, this.Mahasiswa).then(() => {
        console.log('Data Berhasil Di edit');
        // Redirect kembali ke halaman utama atau lakukan tindakan lain yang diperlukan
        this.$router.push('/mahasiswa'); // Contoh penggunaan Vue Router untuk kembali ke halaman data mahasiswa
      });
    },
    loadAgamaList() {
      // Permintaan untuk mendapatkan daftar agama
      var agamaUrl = 'http://127.0.0.1:8000/api/agama';
      axios.get(agamaUrl).then(({ data }) => {
        console.log(data);
        this.agamaList = data;
      });
    },
  }
};
</script>
  
