<template>
    <div class="container mt-4">
      <div class="card shadow p-3 mb-5 bg-white rounded">
        <div class="card-body">
          <h2 class="card-title">Upload Nilai</h2>
          <form @submit.prevent="tambahKrs">
            <div class="mb-3">
              <label for="krs_id" class="form-label">Semester</label>
              <select class="form-select" id="krs_id" v-model="DetilKrs.krs_id">
                <option v-for="semester in semesterList" :key="semester.id" :value="semester.id">{{ semester.tahun }} - {{ semester.semester }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="mahasiswa_id" class="form-label">NIM Mahasiswa</label>
              <select class="form-select" id="mahasiswa_id" v-model="DetilKrs.mahasiswa_id">
                <option v-for="mahasiswa in mahasiswaList" :key="mahasiswa.id" :value="mahasiswa.id">{{ mahasiswa.nim }} - {{ mahasiswa.nama }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="matakuliah_id" class="form-label">Nama Matakuliah</label>
              <select class="form-select" id="matakuliah_id" v-model="DetilKrs.matakuliah_id">
                <option v-for="matakuliah in matakuliahList" :key="matakuliah.id" :value="matakuliah.id">{{ matakuliah.kode }} - {{ matakuliah.namamatakuliah }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="nilai" class="form-label">Nilai</label>
              <input type="text" class="form-control" id="nilai" v-model="DetilKrs.nilai" name="nilai">
            </div>
  
            <div class="btn-group">
              <button class="btn btn-primary" type="submit">Tambah</button>
              <router-link class="btn btn-danger" to="/detil">Kembali</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
  
  
  
  <script>
  import axios from 'redaxios';
  
  export default {
    name: 'TambahDetilKrs',
    data() {
      return {
        mahasiswaList:[],
        matakuliahList:[],
        semesterList:[],
        DetilKrs: {
        'id': '',
        'krs_id': '',
        'mahasiswa_id': '',
        'matakuliah_id': '',
        'nilai': '',
      },
      };
    },
    created() {
      this.loadMahasiswaList();
      this.loadMatakuliahList();
      this.loadSemesterList();
    },
    methods: {
        tambahKrs() {
        var url = 'http://127.0.0.1:8000/api/detilkrs';
        axios.post(url, this.DetilKrs).then(() => {
          console.log('Data Berhasil Ditambahkan');
          // Redirect ke halaman lain atau lakukan tindakan lain yang diperlukan
          this.$router.push('/detil');
        }).catch((error) => {
          console.error('Error adding data:', error);
        });
      },
      loadMahasiswaList() {
        var agamaUrl = 'http://127.0.0.1:8000/api/mahasiswa';
        axios.get(agamaUrl).then(({ data }) => {
          console.log(data);
          this.mahasiswaList = data;
        });
      },
      loadMatakuliahList() {
        var agamaUrl = 'http://127.0.0.1:8000/api/matakuliah';
        axios.get(agamaUrl).then(({ data }) => {
          console.log(data);
          this.matakuliahList = data;
        });
      },
      loadSemesterList() {
        var agamaUrl = 'http://127.0.0.1:8000/api/krs';
        axios.get(agamaUrl).then(({ data }) => {
          console.log(data);
          this.semesterList = data;
        });
      },
    }
  };
  </script>
  