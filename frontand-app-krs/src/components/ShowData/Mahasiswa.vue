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
              <th>NIM</th>
              <td>{{ Mahasiswa.nim }}</td>
            </tr>
            <tr>
              <th>Nama</th>
              <td>{{ Mahasiswa.nama }}</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <td>{{ Mahasiswa.alamat }}</td>
            </tr>
            <tr>
              <th>Tanggal Lahir</th>
              <td>{{ Mahasiswa.lahir }}</td>
            </tr>
            <tr>
              <th>Agama</th>
              <td>{{ getAgamaName(Mahasiswa.agama_id) }}</td>            </tr>
          </table>
          
          
          <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3">
          <thead>
            <tr>
              <th>Matakuliah</th>
              <th>Nilai</th>
              <th>Predikat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(matakuliah, index) in getMatakuliah(MahasiswaId)" :key="index">
              <td>{{ matakuliah.namamatakuliah }}</td>
              <td>{{ getNilai(MahasiswaId, matakuliah.id) }}</td>
              <td>{{ getPredikat(getNilai(MahasiswaId, matakuliah.id)) }}</td>            </tr>
          </tbody>
        </table>
  
          <!-- Button with W3Schools CSS -->
          <router-link to="/mahasiswa" class="btn btn-danger">Kembali</router-link>
  
          <!-- Additional content for KRS admin page -->
        </main>
      </div>
    </div>
</template>

<script>
import axios from 'redaxios';

export default {
name: 'ShowMahasiswaView',
data() {
  return {
    MahasiswaId: this.$route.params.id,
    agamaList: [],
    matakuliahList: [],
    Mahasiswa: {
      'id': '',
      'nim': '',
      'nama': '',
      'alamat': '',
      'lahir': '',
      'agama_id': ''
    }, DetilKrs: {
        'id': '',
        'krs_id': '',
        'mahasiswa_id': '',
        'matakuliah_id': '',
        'nilai': '',
    }
  };
},
created() {
  // Ambil data mahasiswa yang akan diedit menggunakan ID dari URL atau properti lainnya
  this.fetchMahasiswaData();
  this.loadAgamaList();
  this.loadDetilKrs();
  this.loadMatakuliahList();
},
computed: {
    isMahasiswaHasMatakuliah() {
      return this.getMatakuliah(this.MahasiswaId).length > 0;
    },
  },
methods: {
  fetchMahasiswaData() {
    var url = `http://127.0.0.1:8000/api/mahasiswa/${this.MahasiswaId}`;
    axios.get(url).then(({ data }) => {
      console.log(data);
      this.Mahasiswa = data;
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
  loadDetilKrs() {
      // Permintaan untuk mendapatkan daftar agama
      var agamaUrl = 'http://127.0.0.1:8000/api/detilkrs';
      axios.get(agamaUrl).then(({ data }) => {
        console.log(data);
        this.DetilKrs = data;
      });
  },
  loadMatakuliahList() {
    // Permintaan untuk mendapatkan daftar agama
    var agamaUrl = 'http://127.0.0.1:8000/api/matakuliah';
    axios.get(agamaUrl).then(({ data }) => {
      console.log(data);
      this.matakuliahList = data;
    });
  },
  getAgamaName(agamaId) {
    // Mengambil nama agama dari daftar agama berdasarkan ID
    const agama = this.agamaList.find(agama => agama.id === agamaId);
    return agama ? agama.agama : 'Unknown';
  },
  getMatakuliah(mahasiswaId) {
      // Ambil daftar matakuliah yang diikuti oleh mahasiswa tertentu
      const matakuliahDetils = this.DetilKrs.filter(detil => detil.mahasiswa_id == mahasiswaId);
      return matakuliahDetils.map(detil => {
        const matakuliah = this.matakuliahList.find(matakuliah => matakuliah.id == detil.matakuliah_id);
        return matakuliah || {};
      });
    },
    getNilai(mahasiswaId, matakuliahId) {
      // Ambil nilai dari matakuliah tertentu yang diikuti oleh mahasiswa
      const detil = this.DetilKrs.find(detil => detil.mahasiswa_id == mahasiswaId && detil.matakuliah_id == matakuliahId);
      return detil ? detil.nilai : 'Unknown';
    },
    getPredikat(nilai) {
      // Fungsi untuk mendapatkan predikat berdasarkan nilai
      if (nilai >= 80) {
        return 'A';
      } else if (nilai >= 70) {
        return 'B';
      } else if (nilai >= 60) {
        return 'C';
      } else if (nilai >= 50) {
        return 'D';
      } else {
        return 'E';
      }
    },
}
};
</script>
