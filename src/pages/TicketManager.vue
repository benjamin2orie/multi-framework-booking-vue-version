<template>
  <div>
    <Header />
    <main class="max-w-[1440px] mx-auto p-6">
      <h1 class="text-3xl font-bold mb-4">Ticket Manager</h1>
      <p v-if="error" class="text-red-500 py-5">{{ error }}</p>

      <!-- Ticket Form -->
      <form @submit.prevent="handleSubmit" noValidate class="mb-6 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Title"
          v-model="form.title"
          class="border p-2 rounded w-full sm:w-auto flex-grow"
        />

        <textarea
          placeholder="Description"
          v-model="form.description"
          class="w-full p-2 border rounded h-24 resize-none"
          required
        />

        <select
          v-model="form.priority"
          class="w-full p-2 border rounded"
          required
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          v-model="form.status"
          class="border p-2 rounded w-full sm:w-auto"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer">
          {{ editing ? 'Update Ticket' : 'Add Ticket' }}
        </button>
      </form>

      <!-- Ticket List -->
      <section class="grid gap-4">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <h2 class="text-lg font-semibold">{{ ticket.title }}</h2>
            <h3>{{ ticket.description }}</h3>

            <p class="flex gap-4">
              status:
              <span
                :class="[
                  'text-sm px-2 py-1 rounded',
                  ticket.status === 'open'
                    ? 'bg-green-100 text-green-700'
                    : ticket.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-200 text-gray-700'
                ]"
              >
                {{ ticket.status.replace('_', ' ') }}
              </span>
            </p>
            <h5>{{ ticket.priority }}</h5>
          </div>
          <div class="flex gap-2">
            <button @click="handleEdit(ticket)" class="text-blue-600 hover:underline">Edit</button>
            <button @click="handleDelete(ticket.id)" class="text-red-600 hover:underline">Delete</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuid } from 'uuid';
import Header from '../components/Header.vue';
import { addTicket, getTickets, updateTicket, deleteTicket } from '../utils/ticketService';

const tickets = ref(getTickets());
const form = ref({ id: '', title: '', status: 'open', description: '', priority: '' });
const editing = ref(false);
const error = ref('');

function handleSubmit() {
  if (!form.value.title || !form.value.description || !['open', 'in_progress', 'closed'].includes(form.value.status)) {
    error.value = 'All fields are required.';
    return;
  }

  if (editing.value) {
    updateTicket(form.value.id, form.value);
  } else {
    addTicket({ ...form.value, id: uuid() });
  }

  tickets.value = getTickets();
  form.value = { id: '', title: '', status: 'open', description: '', priority: '' };
  editing.value = false;
}

function handleEdit(ticket) {
  form.value = { ...ticket };
  editing.value = true;
}

function handleDelete(id) {
  if (confirm('Delete this ticket?')) {
    deleteTicket(id);
    tickets.value = getTickets();
  }
}
</script>
