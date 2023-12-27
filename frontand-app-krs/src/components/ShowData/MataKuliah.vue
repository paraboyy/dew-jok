<template>
    <div>
      <!-- Sidebar with W3Schools CSS -->
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
  
        <!-- Blue Header with W3Schools CSS -->
        <div class="w3-container w3-blue">
          <h1>DETAIL MATAKULIAH</h1>
        </div>
  
        <!-- Main Content with W3Schools CSS -->
        <main class="w3-container">
          <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3">
            <tr>
              <th>Kode</th>
              <td>{{ matakuliah.kode }}</td>
            </tr>
            <tr>
              <th>Nama Matakuliah</th>
              <td>{{ matakuliah.namamatakuliah }}</td>
            </tr>
            <tr>
              <th>SKS</th>
              <td>{{ matakuliah.sks }}</td>
            </tr>
            <tr>
              <th>Semester</th>
              <td>{{ matakuliah.semester }}</td>
            </tr>
          </table>
  
          <!-- Button with W3Schools CSS -->
          <router-link to="/matkul" class="btn btn-danger">Kembali</router-link>
  
          <!-- Additional content for KRS admin page -->
        </main>
      </div>
    </div>
</template>

<script>
import axios from 'redaxios'; // Pastikan bahwa Anda mengimport axios

export default {
name: 'ShowMataKuliah',
data() {
  return {
    MatakuliahId: this.$route.params.id,
    matakuliah: {
      'id': '',
      'kode': '',
      'namamatakuliah': '',
      'sks': '',
      'semester': ''
    }
  };
},
created() {
  // Ambil data mahasiswa yang akan diedit menggunakan ID dari URL atau properti lainnya
  this.fetchMahasiswaData();
},
methods: {
  fetchMahasiswaData() {
    var url = `http://127.0.0.1:8000/api/matakuliah/${this.MatakuliahId}`;
    axios.get(url).then(({ data }) => {
      console.log(data);
      this.matakuliah = data;
    });
  },
}
};
</script>
