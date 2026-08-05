<script setup lang="ts">
    import { useRouter } from 'vue-router';
    const router = useRouter()

    type productsType = {
      name: string,
      price: number,
      image: string
    }

    const products: productsType[] = [
        {
          name: 'Plecak', 
          price: 100, 
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80'
        },
        {
          name: 'Buty', 
          price: 350,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80'
        },
        {
          name: 'Czapka', 
          price: 80,
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&q=80'
        }
    ]

    const buyProduct = (product: productsType ) => {
      alert('Świetny wybór!')
      localStorage.setItem('cartItem', JSON.stringify(product))
      router.push('/cart')
    }

    const logOut = () => {
      localStorage.removeItem('logged')
      localStorage.removeItem('username')
      router.push('/')
    }
</script>


<template>
    <div class="shop-container">
        <div class="top-bar">
          <button @click="logOut" class="logout-btn">Wyloguj się</button>
        </div>

        <h1>WYBIERZ COŚ DLA SIEBIE</h1>
        
        <div class="products-grid">
            <div 
            v-for="(item, index) in products" :key="index" class="product-card">
                <img :src="item.image" :alt="item.name" class="product-image" />
                <h2>{{ item.name }}</h2>
                <p>Cena: {{ item.price }} zł</p>

                <button @click="buyProduct(item)" class="buy-btn">Kup</button>
          </div>
        </div>
    </div>
</template>

<style scoped>
    .top-bar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2rem;
    }
    .logout-btn {
      background-color: red;
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.2s;
    }
    .logout-btn:hover {
      background-color: rgb(152, 24, 24);
    }

    .shop-container {
      text-align: center;
      padding: 2rem;
    }
    .products-grid {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }
    .product-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 1.5rem;
      width: 200px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .product-image {
      width: 100%;
      height: 50%;
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    .buy-btn {
      background-color: #10b981;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      font-weight: bold;
    }
    .buy-btn:hover {
      background-color: #059669;
    }
</style>