import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import("../components/Login.vue")
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import("../components/Dashboard.vue")
    },
    {
        path: '/matkul',
        name: 'MataKuliah',
        component: () => import("../components/MataKuliah.vue")
    },
    {
        path: '/mahasiswa',
        name: 'Mahasiswa',
        component: () => import("../components/Mahasiswa.vue")
    },
    {
        path: '/krsan',
        name: 'Krs',
        component: () => import("../components/Krs.vue")
    },
    {
        path: '/detil',
        name: 'DetilKrs',
        component: () => import("../components/DetilKrs.vue")
    },
    {
        path: '/tambahmatkul',
        name: 'TambhaMataKuliah',
        component: () => import("../components/TambahData/Matakuliah.vue")
    },
    {
        path: '/tambahmahasiswa',
        name: 'TambahMahasiswa',
        component: () => import("../components/TambahData/Mahasiswa.vue")
    },
    {
        path: '/tambahkrs',
        name: 'TambahKrs',
        component: () => import("../components/TambahData/Krs.vue")
    },
    {
        path: '/tambahdetilkrs',
        name: 'TambahDetilKrs',
        component: () => import("../components/TambahData/DetilKrs.vue")
    },
    {
        path: '/editmatkul/:id',
        name: 'EditMataKuliah',
        component: () => import("../components/EditData/MataKuliah.vue")
    },
    {
        path: '/editmahasiswa/:id',
        name: 'EditMahasiswa',
        component: () => import("../components/EditData/Mahasiswa.vue")
    },
    {
        path: '/editkrs/:id',
        name: 'EditKrs',
        component: () => import("../components/EditData/Krs.vue")
    },
    {
        path: '/showmatkul/:id',
        name: 'ShowMataKuliah',
        component: () => import("../components/ShowData/MataKuliah.vue")
    },
    {
        path: '/showmahasiswa/:id',
        name: 'ShowMahasiswa',
        component: () => import("../components/ShowData/Mahasiswa.vue")
    },
    {
        path: '/showkrs/:id',
        name: 'ShowKrs',
        component: () => import("../components/ShowData/Krs.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
