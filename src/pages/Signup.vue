<template>
  <form @submit.prevent="handleSignup" noValidate class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded shadow max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
      <p v-if="error" class="text-red-500 py-3">{{ error }}</p>

      <input
        type="email"
        placeholder="Email"
        v-model="email"
        class="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Name"
        v-model="name"
        class="w-full mb-4 p-2 border rounded"
        :maxlength="15"
        :minlength="4"
      />

      <input
        type="password"
        placeholder="Password (min 6 chars)"
        v-model="password"
        class="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
        Create Account
      </button>

      <p class="py-5">
        Already have an account?
        <router-link to="/auth/login" class="text-purple-600">Login</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../utils/auth';
import { saveUser } from '../utils/userService';

const email = ref('');
const password = ref('');
const name = ref('');
const error = ref('');
const router = useRouter();

function handleSignup() {
  if (name.value.length < 4 || name.value.length > 15) {
    error.value = 'Name must be between 4 to 15 characters';
    return;
  }

  if (!email.value || password.value.length < 6) {
    error.value = 'Password and email must be at least 6 characters';
    return;
  }

  const success = saveUser({
    email: email.value,
    password: password.value,
    name: name.value,
  });

  if (!success) {
    error.value = 'User already exists! Please login';
    return;
  }

  login('mock-token', { email: email.value });
  router.push('/dashboard');
}
</script>
