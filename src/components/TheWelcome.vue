<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const router = useRouter();

const userName = ref('');
const password = ref('');
const error = ref(false);
const errorMsg = ref('');
const isLoading = ref(false);

const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName.value || !password.value) {
        error.value = true;
        errorMsg.value = 'Por favor, ingresa usuario y contraseña.';
        return;
    }
    await login();
};

const login = async () => {
    isLoading.value = true;
    error.value = false;
    errorMsg.value = '';

    try {
        // Simulación de una llamada a API
        const response = await simulateApiCall(userName.value, password.value);
        
        if (response.success) {
            // Login exitoso
            console.log('Login exitoso');
            // Aquí puedes guardar el token en el almacenamiento local si es necesario
            // localStorage.setItem('token', response.token);
            router.push('/dashboard'); // Redirige al dashboard o página principal
        } else {
            throw new Error(response.message);
        }
    } catch (err) {
        error.value = true;
        errorMsg.value = err.message || 'Error en el inicio de sesión. Por favor, intenta de nuevo.';
    } finally {
        isLoading.value = false;
    }
};

// Función para simular una llamada a API
const simulateApiCall = (username, password) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                resolve({ success: true, token: 'fake_token_123' });
            } else {
                resolve({ success: false, message: 'Credenciales inválidas' });
            }
        }, 1000); 
    });
};
</script>

<template>
<div class="wrapper">
    <div class="logo">
        <img src='../assets/imgs/logo.png' alt="Logo">
    </div>
    <div class="text-center mt-4 name">
        PsYkela
    </div>
    <form @submit="handleSubmit" class="p-3 mt-3">
        <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input type="text" name="userName" id="userName" placeholder="Username" v-model="userName" :disabled="isLoading">
        </div>
        <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input type="password" name="password" id="pwd" placeholder="Password" v-model="password" :disabled="isLoading">
        </div>
        <button type="submit" class="btn mt-3" :disabled="isLoading">
            {{ isLoading ? 'Cargando...' : 'Login' }}
        </button>
    </form>
    <div v-if="error" class="error-message mt-3 text-center text-danger">
        {{ errorMsg }}
    </div>
    <div class="text-center fs-6 mt-3">
        <a href="#">¿Olvidaste tu contraseña?</a> o <a href="#">Registrarse</a>
    </div>
</div>
</template>


<style scoped>
/* Importing fonts from Google */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Reseting */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: #ecf0f3;
}

.wrapper {
    max-width: 350px;
    min-height: 500px;
    margin: 80px auto;
    padding: 40px 30px 30px 30px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.logo {
    width: 80px;
    margin: auto;
    background-image: "../assets/imgs/logo.png";
}

.logo img {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #5f5f5f,
        0px 0px 0px 5px #ecf0f3,
        8px 8px 15px #a7aaa7,
        -8px -8px 15px #fff;
}

.wrapper .name {
    font-weight: 600;
    font-size: 1.4rem;
    letter-spacing: 1.3px;
    padding-left: 10px;
    color: #555;
}

.wrapper .form-field input {
    width: 100%;
    display: block;
    border: none;
    outline: none;
    background: none;
    font-size: 1.2rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    /* border: 1px solid red; */
}

.wrapper .form-field {
    padding-left: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
    color: #555;
}

.wrapper .btn {
    box-shadow: none;
    width: 100%;
    height: 40px;
    background-color: #8e44ad;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1,
        -3px -3px 3px #fff;
    letter-spacing: 1.3px;
}

.wrapper .btn:hover {
    background-color: #8e44ad;
}

.wrapper a {
    text-decoration: none;
    font-size: 0.8rem;
    color: #8e44ad
}

.wrapper a:hover {
    color: #8e44ad;
}

@media(max-width: 380px) {
    .wrapper {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
}
</style>

