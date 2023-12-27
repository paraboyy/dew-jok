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
            <h1>Edit Matakuliah</h1>

            <form @submit.prevent="simpan()">
              <div class="mb-3">
              <label for="tahun" class="form-label">Tahun</label>
              <input type="text" class="form-control" id="tahun" v-model="Krs.tahun">
            </div>
            <div class="mb-3">
                <label class="form-label">Semester</label>

                <!-- Pilihan radio button -->
                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    id="semester"
                    value="Ganjil"
                    v-model="Krs.semester"
                    />
                    <label class="form-check-label" for="semester">Ganjil</label>
                </div>

                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    id="semester"
                    value="Genap"
                    v-model="Krs.semester"
                    />
                    <label class="form-check-label" for="semester">Genap</label>
                </div>

                <!-- Tambahkan pilihan radio button sesuai kebutuhan -->
            </div>

                <div class="mb-3">
                    <button type="submit" class="btn btn-info">Simpan Perubahan</button>
                    <router-link to="/krsan" class="btn btn-danger">Kembali</router-link>
                </div>
            </form>
        </div>
    </main>
  </div>
  </div>
</template>




<script>
import axios from 'redaxios';

export default {
name: 'EditKrs',
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
  simpan() {
    var url = `http://127.0.0.1:8000/api/krs/${this.Krs.id}`;
    axios.put(url, this.Krs).then(() => {
      console.log('Data Berhasil Di edit');
      // Redirect kembali ke halaman utama atau lakukan tindakan lain yang diperlukan
      this.$router.push('/Krsan'); // Contoh penggunaan Vue Router untuk kembali ke halaman data mahasiswa
    });
  },
}
};
</script>
