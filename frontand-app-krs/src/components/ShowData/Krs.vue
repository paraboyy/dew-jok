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
          <h1>DETAIL KRS</h1>
        </div>
  
        <!-- Main Content with W3Schools CSS -->
        <main class="w3-container">
          <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3">
            <tr>
              <th>Tahun</th>
              <td>{{ Krs.tahun }}</td>
            </tr>
            <tr>
              <th>Semester</th>
              <td>{{ Krs.semester }}</td>
            </tr>
          </table>
  
          <!-- Button with W3Schools CSS -->
          <router-link to="/krsan" class="btn btn-danger">Kembali</router-link>
  
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
    KrsId: this.$route.params.id,
    Krs: {
      'id': '',
      'tahun': '',
      'semester': '',
    }
  };
},
created() {
  // Ambil data mahasiswa yang akan diedit menggunakan ID dari URL atau properti lainnya
  this.fetchKrsData();
},
methods: {
  fetchKrsData() {
    var url = `http://127.0.0.1:8000/api/krs/${this.KrsId}`;
    axios.get(url).then(({ data }) => {
      console.log(data);
      this.Krs = data;
    });
  },
}
};
</script>
