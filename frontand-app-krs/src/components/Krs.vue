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
        <h1>KRS</h1>
        </div>

        <!-- Konten Utama -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
            <router-link class="btn btn-success" to="/tambahkrs">Tambah Data</router-link>

            <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3">
                <thead>
                    <tr>
                        <th>Tahun</th>
                        <th>Semester</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                        <tr v-for="(Krs) in allKrs" :key="Krs.id">
                            <td>{{ Krs.tahun }}</td>
                            <td>{{ Krs.semester }}</td>
                            <td>
                                <div class="btn-group">
                                    <router-link :to="{name: 'ShowKrs', params:{id: Krs.id}}" class="btn btn-info">Lihat</router-link>
                                    <router-link :to="{name: 'EditKrs', params:{id: Krs.id}}" class="btn btn-warning">Edit</router-link>
                                    <button type="button" class="btn btn-danger" @click="removeKrs(Krs)">Hapus</button>
                                </div>
                            </td>
                        </tr>
                </tbody>
            </table>

            <!-- Isi konten halaman admin KRS disini -->
        </main>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  name: 'KrsView',
  data() {
    return {
      allKrs: {},
      Krs: {
        'id': '',
        'tahun': '',
        'semester': '',
      }
    };
  },
  created() {
    console.log('Created !');
    this.loadAllKrs();
  },
  mounted() {
    console.log('Mounted !');
  },
  methods: {
    loadAllKrs() {
      var url = 'http://127.0.0.1:8000/api/krs';
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.allKrs = data;
      });
    },
    removeKrs(Krs) {
      var url = `http://127.0.0.1:8000/api/krs/${Krs.id}`;
      axios.delete(url).then(() => {
        console.log('Data Berhasil Dihapus !');
        this.loadAllKrs(); // Memanggil kembali data setelah menghapus
      }).catch((error) => {
        console.error('Error deleting data:', error);
      });
    },
  },
}
</script>
