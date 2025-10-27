
<template>
  <form @submit.prevent="handleLogin" class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded shadow max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <p v-if="error" class="text-red-500 py-3">{{ error }}</p>

      <input
        type="email"
        placeholder="Email"
        v-model="email"
        class="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="w-full mb-4 p-2 border rounded"
        required
      />

      <button type="submit" class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
        Login
      </button>

      <p class="py-5">
        Don't have an account?
        <router-link to="/auth/signup" class="text-purple-600">Sign Up</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../utils/auth';
import { findUser } from '../utils/userService';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

function handleLogin() {
  const user = findUser(email.value, password.value);
  if (!user) {
    error.value = 'Invalid email or password';
    return;
  }
  login('mock-token', { email: user.email });
  router.push('/dashboard');
}
</script>
