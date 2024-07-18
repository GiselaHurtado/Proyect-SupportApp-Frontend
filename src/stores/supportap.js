import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFavoritesStore } from "../stores/favorites.js"; 

export const userHeroesStore = defineStore('requests', () => {
    
    const uri = import.meta.env.VITE_API_ENDPOINT_SUPPORTAPP

    const superHeroes = ref([])
    const isLoading = ref(false)

    async function get () {

        
        try {
            isLoading.value = false
            const response = await fetch(uri + 'all.json')
            const data = await response.json()

            if (response.status == 200) {
                superHeroes.value = data.slice(0,20)
                console.log(superHeroes.value);
                isLoading.value = true
            }

        } catch (error) {
            throw new Error('Error loading api:' + error)
        }

    }

    return { superHeroes, isLoading, get }
})