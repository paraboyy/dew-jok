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
        <h1>Matakuliah</h1>
        </div>

        <!-- Konten Utama -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
            <router-link class="btn btn-success" to="/tambahmatkul">Tambah Data</router-link>

            <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3">
                <thead>
                    <tr>
                        <th>Kode</th>
                        <th>Nama Matakuliah</th>
                        <th>SKS</th>
                        <th>Semester</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                        <tr v-for="(Matakuliah) in allMatakuliah" :key="Matakuliah.id">
                            <td>{{ Matakuliah.kode }}</td>
                            <td>{{ Matakuliah.namamatakuliah }}</td>
                            <td>{{ Matakuliah.sks }}</td>
                            <td>{{ Matakuliah.semester }}</td>
                            <td>
                                <div class="btn-group">
                                    <router-link :to="{name: 'ShowMataKuliah', params:{id: Matakuliah.id}}" class="btn btn-info">Lihat</router-link>
                                    <router-link :to="{name: 'EditMataKuliah', params:{id: Matakuliah.id}}" class="btn btn-warning">Edit</router-link>
                                    <button type="button" class="btn btn-danger" @click="removeMatakuliah(Matakuliah)">Hapus</button>
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
  name: 'Matakuliah',
  data() {
    return {
      allMatakuliah: {},
      Matakuliah: {
        'id': '',
        'kode': '',
        'namamatakuliah': '',
        'sks': '',
        'semester': ''
      }
    };
  },
  created() {
    console.log('Created !');
    this.loadAllMatakuliah();
  },
  mounted() {
    console.log('Mounted !');
  },
  methods: {
    loadAllMatakuliah() {
      var url = 'http://127.0.0.1:8000/api/matakuliah';
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.allMatakuliah = data;
      });
    },
    removeMatakuliah(Matakuliah) {
      var url = `http://127.0.0.1:8000/api/matakuliah/${Matakuliah.id}`;
      axios.delete(url).then(() => {
        console.log('Data Berhasil Dihapus !');
        this.loadAllMatakuliah(); // Memanggil kembali data setelah menghapus
      }).catch((error) => {
        console.error('Error deleting data:', error);
      });
    },
  },
}
</script>
