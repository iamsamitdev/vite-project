<template>
    <div>
        <div class="flex items-center justify-between my-8">
            <h2 class="my-6 text-sm font-semibold text-gray-700 md:text-xl dark:text-gray-200">
                Product list (0)
            </h2>

            <div class="flex justify-center flex-1 lg:mr-32">
                <div class="relative w-full max-w-xl ml-4 mr-6 focus-within:text-gray-500">
                    <div class="absolute inset-y-0 flex items-center pl-2">
                        <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <form @submit.prevent="onSubmit">
                        <input
                            class="w-full py-2 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-200 border-0 rounded-md"
                            type="text"
                            placeholder="ป้อนชื่อสินค้าที่ต้องการค้นหา"
                            aria-label="Search"
                        />
                        <button type="submit" class="hidden">Submit</button>
                    </form>
                </div>

                <div>
                    <button class="flex items-center justify-between px-4 py-1.5 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-purple">
                        <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>ล้าง</span>
                    </button>
                </div>
            </div>

            <button class="flex items-center justify-between px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
                <svg class="w-4 h-4 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>เพิ่ม</span>
            </button>
        </div>

        <!-- ตารางแสดงสินค้า -->
        <div class="w-full overflow-hidden rounded-lg shadow-xs">

            <div v-show="loading" class="w-full overflow-x-auto">
                <div class="flex h-screen">
                    <div class="mx-auto my-80">
                        <h3 class="text-white">กำลังโหลดข้อมูล...</h3>
                    </div>
                </div>
            </div>

            <table class="w-full whitespace-no-wrap" v-if="!loading">
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">ID</th>
                        <th class="px-4 py-3">Product</th>
                        <th class="px-4 py-3">Price</th>
                        <th class="px-4 py-3">By</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    
                    <tr v-for="product in products.data" :key="product.id" class="text-gray-700 dark:text-gray-400 hover:bg-blue-100">
                        <td class="px-4 py-3 text-sm">{{ product.id }}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img class="object-cover w-full h-full rounded-full" :src="product.image" alt="" loading="lazy"/>
                                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                </div>
                                <div>
                                    <p class="font-semibold">{{ product.name }}</p>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Created {{ product.created_at }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ product.price }}</td>
                        <td class="px-4 py-3 text-sm">
                            <div class="flex items-center text-sm">
                                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img class="object-cover w-full h-full rounded-full" :src="product.users.avatar" alt="" loading="lazy"/>
                                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                </div>
                                <div>
                                    <p class="font-semibold">{{ product.users.fullname }}</p>
                                    <p class="text-xs text-gray-600 dark:text-gray-400">Updated {{product.updated_at}}</p>
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>            
            
        </div>
    </div>
</template>

<script>

    import http from '@/services/BackendService'

    export default {
        data(){
            return {
                // loading
                loading: false,

                // ไว้กำหนดหน้าสินค้าที่ต้องการดึง
                currentPage: 0,

                // ตัวแปรสำหรับเก็บข้อมูลสินค้าที่อ่านจาก API
                products: [],
            }
        },

        methods: {
            // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api ทั้งหมด
             async getProducts(pageNumber){
                this.loading = true
                let response = await http.get(`products?page=${pageNumber}`)
                this.loading = false
                let responseProduct = response.data
                this.products = responseProduct
             }
        },

        mounted(){
            this.currentPage = 1
            // อ่านสินค้าจาก API
            this.getProducts(this.currentPage)
            // console.log(this.products)
        }
    }

</script>

<style lang="css" scoped>

</style>