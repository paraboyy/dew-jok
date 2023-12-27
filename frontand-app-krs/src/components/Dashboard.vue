

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
        <main class="w3-container">
          <table class="w3-table w3-striped w3-bordered mt-3 w3-card mb-3" style="width: 90%;">
            <div>
                <center><h2>Jumlah Mahasiswa berdasarkan Alamat</h2></center>
                <canvas ref="chartCanvas" width="400" height="200"></canvas>
            </div>
            <!-- Isi konten halaman admin KRS disini -->
        </table>
        </main>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Chart from 'chart.js/auto';


export default {
  data() {
    return {
      addressCounts: [],  // Menggunakan array objek untuk menyimpan alamat dan jumlah mahasiswa
      chart: null,
    };
  },
  created() {
    this.fetchMahasiswaData();
  },
  methods: {
    fetchMahasiswaData() {
      const apiUrl = 'http://127.0.0.1:8000/api/mahasiswa';

      axios.get(apiUrl)
        .then(response => {
          const data = response.data;

          // Proses data untuk mengambil alamat dan jumlah mahasiswa
          const addressCountsMap = new Map();

          data.forEach(item => {
            const address = item.alamat;

            // Jika alamat sudah ada dalam map, tambahkan jumlah mahasiswa
            if (addressCountsMap.has(address)) {
              addressCountsMap.set(address, addressCountsMap.get(address) + 1);
            } else {
              // Jika alamat belum ada dalam map, inisialisasi jumlah mahasiswa menjadi 1
              addressCountsMap.set(address, 1);
            }
          });

          // Konversi Map menjadi array objek
          this.addressCounts = Array.from(addressCountsMap).map(([address, count]) => ({ address, count }));

          // Panggil fungsi untuk membuat grafik
          this.createChart();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    createChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.$refs.chartCanvas, {
        type: 'bar',
        data: {
          labels: this.addressCounts.map(item => item.address),
          datasets: [{
            label: 'Jumlah Mahasiswa',
            data: this.addressCounts.map(item => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          }],
        },
        options: {
            indexAxis: 'y',
        }
      });
    },
  },
};
</script>