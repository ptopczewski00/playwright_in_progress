<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router';

    const router = useRouter()

    type productsType = {
      name: string,
      price: number,
      image: string
    }

    const chosenItem = ref<productsType | null>(null)

    onMounted(() => {
        const savedItem = localStorage.getItem('cartItem')

        if (savedItem) {
            chosenItem.value = JSON.parse(savedItem)
        }
    })

    const finalPayment = () => {
        alert('Transakcja udana. Dziękujemy za zakupy!')
        localStorage.removeItem('cartItem')
        router.push('/shop')
    }
</script>


<template>
    <div class="cart-container">
    <h1>Twój Koszyk</h1>
    
    <div v-if="chosenItem" class="cart-details">
      <img :src="chosenItem.image" :alt="chosenItem.name" class="cart-image" />
      <h2>{{ chosenItem.name }}</h2>
      <p class="price">Do zapłaty: {{ chosenItem.price }} zł</p>
      
      <button @click="finalPayment" class="pay-btn">Zapłać</button>
    </div>
    
    <div v-else>
      <p>Twój koszyk jest pusty.</p>
      <button @click="router.push('/shop')">Wróć do sklepu</button>
    </div>
  </div>
</template>


<style scoped>
    .cart-container {
      text-align: center;
      padding: 2rem;
    }
    .cart-details {
      border: 2px dashed #3b82f6;
      border-radius: 8px;
      padding: 2rem;
      max-width: 300px;
      margin: 2rem auto;
    }
    .cart-image {
      font-size: 5rem;
    }
    .price {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 1rem 0;
    }
    .pay-btn {
      background-color: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: bold;
    }
    .pay-btn:hover {
      background-color: #2563eb;
    }
</style>