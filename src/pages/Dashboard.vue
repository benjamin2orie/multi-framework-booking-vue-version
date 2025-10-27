<template>
  <div>
    <Header />
    <div class="max-w-[1440px] mx-auto p-6">
      <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-green-100 p-4 rounded shadow">Open Tickets: {{ open }}</div>
        <div class="bg-yellow-100 p-4 rounded shadow">In Progress: {{ inProgress }}</div>
        <div class="bg-gray-200 p-4 rounded shadow">Closed: {{ closed }}</div>
      </div>
      <div class="flex gap-4">
        <button @click="goToTickets" class="bg-indigo-600 text-white px-4 py-2 rounded">Manage Tickets</button>
        <button @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import { logout } from '../utils/auth';
import { getTickets } from '../utils/ticketService';

const router = useRouter();
const tickets = getTickets();

const open = tickets.filter(t => t.status === 'open').length;
const inProgress = tickets.filter(t => t.status === 'in_progress').length;
const closed = tickets.filter(t => t.status === 'closed').length;

function goToTickets() {
  router.push('/tickets');
}

function handleLogout() {
  logout();
  router.push('/auth/login');
}
</script>
