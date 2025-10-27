<template>
  <header class="bg-white shadow p-4 flex lg:flex-row md:flex-row flex-row justify-between lg:items-center lg:w-full max-w-[1440px]s lg:px-[5em] md:px-[2em] sticky top-0 z-50 gap-6">
    <router-link to="/" class="text-xl font-bold text-indigo-600">🎟️ TicketApp</router-link>

    <div v-if="authenticated && user" class="flex items-center gap-4">
        <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center uppercase">
            {{ user.email?.[0] }}
            </div>
            <span class="text-sm text-gray-700">{{ user.email }}</span>
        </div>
    
        <button
            @click="handleLogout"
            :class="['bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600', location.path === '/dashboard' ? 'hidden' : 'flex']"
        >
            Logout
        </button>
    </div>



    <div v-else class="flex gap-2">
      <router-link to="/auth/login" class="text-indigo-600 hover:underline">Login</router-link>
      <router-link to="/auth/signup" class="text-purple-600 hover:underline">Sign Up</router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUser, isAuthenticated, logout } from '../utils/auth';

const router = useRouter();
const location = useRoute();

const user = ref(null);
console.log(user)
const authenticated = ref(false);

onMounted(() => {
  user.value = getUser();
  authenticated.value = isAuthenticated();
});
</script>


