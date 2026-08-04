<script setup lang="ts"> 
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const curr_date = new Date()
    const curr_time = curr_date.getHours()
    const username = ref('')
    const password = ref('')
    const error_message = ref('')
    const data = [
        {user: 'piotr', pass: '2012'},
        {user: 'pawel', pass: 'abc123'},
        {user: 'kamil', pass: '2@26'},
    ]

    const logAttempt = () => {
        error_message.value = ''
        const login = data.find(x => x.user === username.value && x.pass === password.value);

        if (username.value === '' || password.value === '') {
            error_message.value = 'Wpisz dane przed zalogowaniem'
        } else if (login) {
            error_message.value = ''
            localStorage.setItem('logged', 'true')
            localStorage.setItem('username', login.user)
            router.push('/shop')
        } else {
            error_message.value = 'Dane logowania są niepoprawne'
        }
    }
</script>

<template>
    <div class="main-page">
        <div class="input-page">
            <h1 v-if="curr_time > 4 && curr_time < 18"> Dzień dobry!</h1>
            <h1 v-else>Dobry wieczór!</h1>

            <form @submit.prevent="logAttempt" class="login-form">
                <div class="input-place">
                    <label for="username">Login</label>
                    <input 
                        id="username" 
                        v-model="username" 
                        type="text" 
                        placeholder="Wpisz login..."
                        @input="error_message = ''"
                    />
                </div>
            
                <div class="input-place">
                    <label for="password">Hasło</label>
                    <input 
                        id="password" 
                        v-model="password" 
                        type="password" 
                        placeholder="Wpisz hasło..."
                        @input="error_message = ''"
                    />
                </div>

                <button type="submit" class="submit-btn">Zaloguj</button>
            </form>
            
            <p v-if="error_message">{{ error_message }}</p>

        </div>
    </div>
</template>

<style scoped>
    .main-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f3f4f6;
      font-family: Arial, sans-serif;
    }

    .input-page {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      color: #1f2937;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .input-place {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-size: 0.9rem;
      font-weight: bold;
      color: #4b5563;
    }

    input {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    .submit-btn {
      background-color: #3b82f6;
      color: white;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 0.5rem;
    }

    .submit-btn:hover {
      background-color: #2563eb;
    }

    p {
      color: #ef4444;
      text-align: center;
      margin-top: 1rem;
      font-weight: bold;
      background-color: #fee2e2;
      padding: 0.5rem;
      border-radius: 6px;
    }
</style>