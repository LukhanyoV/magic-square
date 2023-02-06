// vue 2
// const app = new Vue({
// 	el: '#app',
// 	data(){
// 		return {
// 			name: 'Lukhanyo Vakele'
// 		}
// 	},
// 	mounted() => {
// 		this.name = this.showFirstName(this.name)
// 	},
// 	methods: {
// 		showFirstName: name => {
// 			return !name ? "whoami" : name.split(" ")[0]
// 		}
// 	}
// })


// vue 3
// const app = Vue.createApp({
// 	data(){
// 		return {
// 			name: 'Lukhanyo Vakele'
// 		}
// 	},
// 	mounted() {
// 		this.name = this.showFirstName(this.name)
// 	},
// 	methods: {
// 		showFirstName: item => {
// 			return !item ? "whoami" : item.split(" ")[0]
// 		}
// 	}
// })
// app.mount('#app')

// vue 3++
// const {createApp, ref, onMounted, computed} = Vue
// const app = {
// 	setup: () => {
// 		const name = ref("Lukhanyo Vakele")

// 		const showFirstName = item => {
// 			return !item ? "whoami" : item.split(" ")[0]
// 		}

// 		onMounted(() => {
// 			name.value = showFirstName(name.value)
// 		})

// 		return {
// 			name,
// 			showFirstName
// 		}
// 	}
// }
// createApp(app).mount('#app')
