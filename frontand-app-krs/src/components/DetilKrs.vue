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
        <h1>Data Detail KRS</h1>
        </div>

        <!-- Konten Utama -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
          <router-link class="btn btn-success" to="/tambahdetilkrs">Tambah Data</router-link>

          <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3">
              <thead>
                <tr>
                    <th scope="col">NIM</th>
                    <th scope="col">Nama Mahasiswa</th>
                    <th scope="col">Nama Matakuliah</th>
                    <th scope="col">Semester</th>
                    <th scope="col">Tahun</th>
                    <th scope="col">Nilai</th>
                    <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                      <tr v-for="(DetilKrs) in allDetilKrs" :key="DetilKrs.id">
                        <td>{{ getNim(DetilKrs.mahasiswa_id) }}</td>
                        <td>{{ getMahasiswa(DetilKrs.mahasiswa_id) }}</td>
                        <td>{{ getNamaMatkuliah(DetilKrs.matakuliah_id) }}</td>
                        <td>{{ getSemester(DetilKrs.krs_id) }}</td>
                        <td>{{ getTahun(DetilKrs.krs_id) }}</td>
                        <td>{{ DetilKrs.nilai }}</td>
                        <td>
                          <div class="btn-group">
                              <!-- <router-link :to="{name: 'EditMahasiswa', params:{id: Mahasiswa.id}}" class="btn btn-warning">Edit</router-link> -->
                              <button type="button" class="btn btn-danger" @click="removeKrs(DetilKrs)">Hapus</button>
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
  name: 'Krs',
  data() {
    return {
      allDetilKrs: {},
      mahasiswaList: [],
      matakuliahList: [],
      krsList: [],
      DetilKrs: {
        'id': '',
        'krs_id': '',
        'mahasiswa_id': '',
        'matakuliah_id': '',
        'nilai': '',
      }
    };
  },
  created() {
    console.log('Created !');
    this.loadAllDetilKrs();
    this.loadMahasiswaList();
    this.loadKrsList();
    this.loadMatakuliahList();
  },
  mounted() {
    console.log('Mounted !');
  },
  methods: {
    loadAllDetilKrs() {
      var url = 'http://127.0.0.1:8000/api/detilkrs';
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.allDetilKrs = data;
      });
    },
    loadMahasiswaList() {
      // Permintaan untuk mendapatkan daftar agama
      var agamaUrl = 'http://127.0.0.1:8000/api/mahasiswa';
      axios.get(agamaUrl).then(({ data }) => {
        console.log(data);
        this.mahasiswaList = data;
      });
    },
    loadKrsList() {
      // Permintaan untuk mendapatkan daftar agama
      var agamaUrl = 'http://127.0.0.1:8000/api/krs';
      axios.get(agamaUrl).then(({ data }) => {
        console.log(data);
        this.krsList = data;
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
    getMahasiswa(mahasiswa_id) {
      // Fungsi untuk mendapatkan nama agama berdasarkan agama_id
      const mahasiswa = this.mahasiswaList.find((mahasiswa) => mahasiswa.id === mahasiswa_id);
      return mahasiswa ? mahasiswa.nama : 'Tidak Diketahui';
    },
    getNim(mahasiswa_id) {
      // Fungsi untuk mendapatkan nama agama berdasarkan agama_id
      const mahasiswa = this.mahasiswaList.find((mahasiswa) => mahasiswa.id === mahasiswa_id);
      return mahasiswa ? mahasiswa.nim : 'Tidak Diketahui';
    },
    getNamaMatkuliah(matakuliah_id) {
      // Fungsi untuk mendapatkan nama agama berdasarkan agama_id
      const matakuliah = this.matakuliahList.find((matakuliah) => matakuliah.id === matakuliah_id);
      return matakuliah ? matakuliah.namamatakuliah : 'Tidak Diketahui';
    },
    getSemester(krs_id) {
      // Fungsi untuk mendapatkan nama agama berdasarkan agama_id
      const semester = this.krsList.find((semester) => semester.id === krs_id);
      return semester ? semester.semester : 'Tidak Diketahui';
    },
    getTahun(krs_id) {
      // Fungsi untuk mendapatkan nama agama berdasarkan agama_id
      const tahun = this.krsList.find((tahun) => tahun.id === krs_id);
      return tahun ? tahun.tahun : 'Tidak Diketahui';
    },
    removeKrs(DetilKrs) {
      var url = `http://127.0.0.1:8000/api/detilkrs/${DetilKrs.id}`;
      axios.delete(url).then(() => {
        console.log('Data Berhasil Dihapus !');
        this.loadAllDetilKrs(); // Memanggil kembali data setelah menghapus
      }).catch((error) => {
        console.error('Error deleting data:', error);
      });
    },
  },
}
</script>
