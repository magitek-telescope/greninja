<template>
  <div class="bg-blue-900 text-indigo-100">
    <div class="p-6">
      <h1 class="text-4xl border-b-4 border-pink-500 inline-block" style="font-family: 'Capriola', sans-serif;">
        greninja
      </h1>
      <p class="pt-2 pb-4 text-sm">
        Simplest Twitter API tester
      </p>
      <div class="container-xl flex justify-start items-stretch mx-auto">
        <div class="w-5/12 flex flex-col">
          <h2 class="text-xl font-bold mb-2">Settings</h2>
          <div class="p-4 rounded-sm bg-white text-gray-900 flex-1">
            <div>
              <label class="flex flex-col">
                <span class="text-sm font-bold text-gray-700">Consumer Key</span>
                <input class="my-2 mb-4 border" @input="saveFormData" v-model="formData.consumer_key" type="text" name="" id="">
              </label>
            </div>
            <div>
              <label class="flex flex-col">
                <span class="text-sm font-bold text-gray-700">Consumer Secret</span>
                <input class="my-2 mb-4 border" @input="saveFormData" v-model="formData.consumer_secret" type="text" name="" id="">
              </label>
            </div>
            <div>
              <label class="flex flex-col">
                <span class="text-sm font-bold text-gray-700">Twitter Token</span>
                <input class="my-2 mb-4 border" @input="saveFormData" v-model="formData.access_token_key" type="text" name="" id="">
              </label>
            </div>
            <div>
              <label class="flex flex-col">
                <span class="text-sm font-bold text-gray-700">Twitter Secret</span>
                <input class="my-2 mb-2 border" @input="saveFormData" v-model="formData.access_token_secret" type="text" name="" id="">
              </label>
            </div>
          </div>
        </div>
        <div class="w-6"></div>
        <div class="w-5/12 h-full flex flex-col">
          <h2 class="text-xl font-bold mb-2">Tester</h2>
          <div class="p-4 rounded-sm bg-white text-gray-900 flex-1">
            <form @submit.prevent="postStatusUpdate">
              <label class="flex flex-col">
                <span class="text-sm font-bold text-gray-700">Post Status</span>
                <div class="flex items-center my-2">
                  <input class="h-8 border flex-1 px-2 rounded" v-model="formData.status" type="text" placeholder="test" name="" id="">
                  <div class="w-2 h-1"></div>
                  <button type="submit" class="apperance-none h-8 py-1 px-2 bg-pink-600 flex items-center justify-center text-sm font-bold text-white rounded-sm">SEND</button>
                </div>
              </label>
            </form>
            <form @submit.prevent="getUsersProfile">
              <label class="flex flex-col">
                <span class="text-sm font-bold text-gray-700">Get Profile</span>
                <div class="flex items-center my-2">
                  <input class="h-8 border flex-1 px-2 rounded" v-model="formData.user_id" type="text" placeholder="2412513164" name="" id="">
                  <div class="w-2 h-1"></div>
                  <button type="submit" class="apperance-none h-8 py-1 px-2 bg-pink-600 flex items-center justify-center text-sm font-bold text-white rounded-sm">SEND</button>
                </div>
              </label>
            </form>
            <div>
              <label class="flex flex-col">
                <span class="text-sm font-bold text-gray-700">Log</span>
                <textarea readonly :value="log" class="w-full border" cols="30" rows="10"></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>
      <footer class="py-4 text-sm font-bold">
        &copy; 2019 @potato4d
      </footer>
    </div>
  </div>
</template>

<script>
import util from 'util'

export default {
  data() {
    return {
      formData: {
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: '',
        status: '',
        user_id: ''
      },
      log: ''
    }
  },
  mounted() {
    const localFormData = JSON.parse(localStorage.getItem('formData') || 'null')
    const formData = localFormData || {
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: '',
      status: '',
      user_id: ''
    }
    this.formData = {...formData}
  },
  methods: {
    saveFormData() {
      localStorage.setItem('formData', JSON.stringify(this.formData))
    },
    async postStatusUpdate() {
      try {
        const data = await this.$axios.post('api/statusUpdate', {...this.formData})
        this.log += util.inspect(data.data.data)
      } catch(e) {
        this.log += util.inspect(e.response.data.error)
      }
    },
    async getUsersProfile() {
      try {
        const data = await this.$axios.post('api/usersShow', {...this.formData})
        this.log += util.inspect(data.data.data)
      } catch(e) {
        this.log += util.inspect(e.response.data.error)
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Capriola&display=swap');
html, body #__nuxt, #__layout, #__layout > div {
  width: 100%;
  min-height: 100vh;
}
</style>
