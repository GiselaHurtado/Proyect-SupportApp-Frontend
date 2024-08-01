<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRequestStore } from '../stores/supportap.js'

const router = useRouter()
const requestStore = useRequestStore()

const requests = ref([])

const fetchRequests = async () => {
  await requestStore.fetchRequests()
  requests.value = requestStore.requests.map((request, index) => ({
    ...request,
    id: request.id || index + 1,
    status: request.status || 'active'
  }))
}

onMounted(() => {
  fetchRequests()
})

watch(() => requestStore.requests, fetchRequests, { deep: true })

const selectedRequestIds = ref([])

const selectAll = computed({
  get: () => selectedRequestIds.value.length === requests.value.length,
  set: (value) => {
    if (value) {
      selectedRequestIds.value = requests.value.map(request => request.id)
    } else {
      selectedRequestIds.value = []
    }
  }
})

const toggleAllSelection = () => {
  if (selectedRequestIds.value.length === requests.value.length) {
    selectedRequestIds.value = []
  } else {
    selectedRequestIds.value = requests.value.map(request => request.id)
  }
}

const isSelected = (requestId) => {
  return selectedRequestIds.value.includes(requestId)
}

const getStatusClass = (status) => {
  if (!status) return 'bu2' 
  
  switch(status.toLowerCase()) {
    case 'active': return 'bu'
    case 'closed': return 'bu4'
    default: return 'bu2'
  }
}

const handleAction = async (action, request, event) => {
  event.preventDefault()
  const requestId = request.id

  console.log(`Handling action: ${action} for request ${requestId}`)
  
  if (action === 'edit') {
    try {
      await router.push({ 
        name: 'requestedit', 
        params: { id: requestId.toString() } 
      })
      console.log(`Navigated to edit page for request ${requestId}`)
    } catch (error) {
      console.error('Error navigating to edit page:', error)
    }
  } else {
    console.log(`Action ${action} for request ${requestId}`)
  }

}


</script>

<template>
  <div class="bg-custom">
    <div class="card">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th class="col checkbox">
                <input type="checkbox" id="selectAll" v-model="selectAll" @change="toggleAllSelection">
              </th>
              <th scope="col" class="id">Id</th>
              <th scope="col" class="username">Username</th>
              <th scope="col" class="designation">Title Request</th>
              <th scope="col" class="status">Status</th>
              <th scope="col" class="action">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in requests" :key="request.id" style="height:70px">
              <td class="col-auto">
                <input type="checkbox" :id="'select' + request.id" 
                       :checked="isSelected(request.id)" 
                       @change="selectAll = false; $event.target.checked ? selectedRequestIds.push(request.id) : selectedRequestIds.splice(selectedRequestIds.indexOf(request.id), 1)">
              </td>
              <td class="id">{{ request.id }}</td>
              <td class="username">
                <img src="https://svgshare.com/i/16Gq.svg" alt="Avatar" class="user-avatar">
                {{ request.firstName }} {{ request.lastName }}
              </td>
              <td class="designation">{{ request.titleRequest }}</td>
              <td class="status">
                <button class="btn btn status-button" :class="getStatusClass(request.status)">
                  {{ request.status }}
                </button>
              </td>
              <td class="action">
                <div class="dropdown">
                  <button class="btn btn-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                      <path d="M8 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                    </svg>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click="handleAction('edit', request, $event)">Edit</a></li>
                    <li><a class="dropdown-item" href="#" @click="handleAction('delete', request, $event)">Delete</a></li>
                    <li><a class="dropdown-item" href="#" @click="handleAction('close', request, $event)">Close</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');


.bg-custom {
    
    font-family: 'Poppins', sans-serif;
    margin-top: auto;
    color: #666;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
    padding: 40px 30px 30px 30px;
    margin-top: 5%;
      
}

.card {
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
    padding: 40px 30px 30px 30px;
    margin-top: 5%;
    margin: 1%;
    background: #ecf0f3;
    color: #666;
    font-family: 'Poppins', sans-serif;
   
}

.status-button {
    border-radius: 50px;
    padding: 5px 15px;
    max-width: 80px;
    min-height: 22px;
    font-family: 'Poppins', sans-serif;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
    
}

.user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}


th.id {
    width: 59px;
    height: 82px;
    padding: 8px;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    font-family: 'Poppins', sans-serif;
    

}

th.username {
    width: 244px;
    height: 82px;
    padding: 8px;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    font-family: 'Poppins', sans-serif;



}

th.designation {
    width: 244px;
    height: 82px;
    padding: 8px;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
}

th.status {
    width: 244px;
    height: 82px;
    padding: 8px;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
}

th.action {
    width: 57px;
    height: 82px;
    padding: 8px;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    background: #ecf0f3;
   padding-right: 20px;
}

th,
td {
    width: 15px;
    height: 76px;
    padding: 8px;
    font-size: 14px;
    line-height: 18px;
    vertical-align: middle !important;
    text-align: left;
    background: #ecf0f3;
    color: #666;
    
}

th.username,
td.username,
th.designation,
td.designation,
th.status,
td.status,
th.action,
td.action th.id,
td.id {
    text-align: center;
    background: #ecf0f3;
    font-family: 'Poppins', sans-serif;
    color: #666;
    
}

.table tbody tr:first-child {
    background-color: #ecf0f3;
    color: #666;   
}


.bu,
.bu3 {
    font-size: 12px;
    font-weight: 600;
    line-height: 8px;
    background-color: #A5E4C2;
    color: #00602C;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.bu:hover,
.bu3:hover {
    background-color: #A5E4C2;
    color: #004d1f;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.bu2 {
    font-size: 12px;
    font-weight: 600;
    line-height: 8px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
    /* background-color: #E4D6A5;
    color: #604B00; */
    background-color: #A5E4C2;
    color: #004d1f;
}

.bu2:hover {
    /* background-color: #d1c292;
    color: #4d3a00; */
    background-color: #A5E4C2;
    color: #004d1f;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.bu4 {
    font-size: 12px;
    font-weight: 600;
    line-height: 8px;
    background-color: #E4A5A5;
    color: #600000;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.bu4:hover {
    background-color: #E4A5A5;
    color: #600000;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.bu5 {
    font-size: 12px;
    font-weight: 600;
    line-height: 8px;
    background-color: #E4A5A5;
    color: #600000;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.bu5:hover {
    background-color: #E4A5A5;
    color: #600000;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.dropdown-menu {
    min-width: 100px;
    max-height: 150px;
    background: #ecf0f3;
    color: #666;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.dropdown-toggle::after {
    display: none !important;
    color: #666;
}

.dropdown-item i {
    margin-right: 5px;
    color: #666;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

.dropdown-toggle,
.dropdown-item i {
    cursor: pointer !important;
    color: #666;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

@media (max-width: 768px) {
    .card {
        max-width: 100%;
        padding: 16px;
    }

    th.id, th.username, th.designation, th.status, th.action, td {
        font-size: 12px;
        padding: 6px;
    }

    .status-button {
        max-width: 60px;
        padding: 4px 10px;
    }

    .user-avatar {
        width: 25px;
        height: 25px;
    }
}

@media (max-width: 480px) {
    .bg-custom {
        padding: 5px;
        margin-right: 5%;
        margin-left: 0%;
    }

    .card {
        padding: 5px;
        margin-right: 5%;
        margin-left: 0%;
    }

    th.id, th.username, th.designation, th.status, th.action, td {
        font-size: 10px;
        padding: 0px;
        margin-right: 5%;
        margin-left: 0%;
    }

    .status-button {
        max-width: 50px;
        padding: 3px 8px;
        margin-left: 0%;
    }

    .user-avatar {
        width: 10px;
        height: 10px;
        margin-left: 0%;
    }

    th.action {
   padding-right: 10%;
   margin-right: 10%;
   margin-left: 0%;
}

    
}

</style>