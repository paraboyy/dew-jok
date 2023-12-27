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
                    <label for="kode" class="form-label">Kode</label>
                    <input type="text" class="form-control" id="kode" name="kode" v-model="matakuliah.kode" required>
                </div>

                <div class="mb-3">
                    <label for="namamatakuliah" class="form-label">Nama Matakuliah</label>
                    <input type="text" class="form-control" id="nim" name="namamatakuliah" v-model="matakuliah.namamatakuliah" required>
                </div>

                <div class="mb-3">
                    <label for="sks" class="form-label">SKS</label>
                    <input type="text" class="form-control" id="sks" name="sks" v-model="matakuliah.sks" required>
                </div>

                <div class="mb-3">
                    <label for="semester" class="form-label">Semester</label>
                    <input type="text" class="form-control" id="semester" name="semester" v-model="matakuliah.semester" required>
                </div>

                <div class="mb-3">
                    <button type="submit" class="btn btn-info">Simpan Perubahan</button>
                    <router-link to="/matkul" class="btn btn-danger">Kembali</router-link>
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
name: 'EditMataKuliah',
data() {
  return {
    MatakuliahId: this.$route.params.id,
    agamaList: [],
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
  simpan() {
    var url = `http://127.0.0.1:8000/api/matakuliah/${this.matakuliah.id}`;
    axios.put(url, this.matakuliah).then(() => {
      console.log('Data Berhasil Di edit');
      // Redirect kembali ke halaman utama atau lakukan tindakan lain yang diperlukan
      this.$router.push('/matkul'); // Contoh penggunaan Vue Router untuk kembali ke halaman data mahasiswa
    });
  },
}
};
</script>
