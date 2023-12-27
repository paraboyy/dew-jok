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
        <h1>Data Mahasiswa</h1>
        </div>

        <!-- Konten Utama -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
          <router-link class="btn btn-success" to="/tambahmahasiswa">Tambah Data</router-link>

          <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3">
              <thead>
                <tr>
                    <th scope="col">NIM</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Tanggal Lahir</th>
                    <th scope="col">Agama</th>
                    <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                      <tr v-for="(Mahasiswa) in allMahasiswa" :key="Mahasiswa.id">
                        <td>{{ Mahasiswa.nim }}</td>
                        <td>{{ Mahasiswa.nama }}</td>
                        <td>{{ Mahasiswa.alamat }}</td>
                        <td>{{ Mahasiswa.lahir }}</td>
                        <td>{{ getAgamaName(Mahasiswa.agama_id) }}</td>
                        <td>
                          <div class="btn-group">
                              <router-link :to="{name: 'ShowMahasiswa', params:{id: Mahasiswa.id}}" class="btn btn-info">Lihat</router-link>
                              <router-link :to="{name: 'EditMahasiswa', params:{id: Mahasiswa.id}}" class="btn btn-warning">Edit</router-link>
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
  name: 'Mahasiswa',
  data() {
    return {
      allMahasiswa: {},
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
    console.log('Created !');
    this.loadAllMahasiswa();
    this.loadAgamaList();
  },
  mounted() {
    console.log('Mounted !');
  },
  methods: {
    loadAllMahasiswa() {
      var url = 'http://127.0.0.1:8000/api/mahasiswa';
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.allMahasiswa = data;
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
    getAgamaName(agama_id) {
      // Fungsi untuk mendapatkan nama agama berdasarkan agama_id
      const agama = this.agamaList.find((agama) => agama.id === agama_id);
      return agama ? agama.agama : 'Tidak Diketahui';
    },
  },
}
</script>
