Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required:true
		}
	},
	template: `
		<div class="product">
			<div class="product-image">
				<img :src="image">
			</div>

			<div class="product-info">
				<h1>{{ title }}</h1>
				<span v-show="isOnSale" style="color:red;">On Sale!!!</span>
				<p v-if="inventory > 10">In Stock</p>
				<p v-else-if="inventory <= 10 && inventory > 0">Almost Out of Stock</p>
				<p v-else>Out of Stock</p>
				<p>User is premium: {{ premium }}</p>
				<p>{{ description }}</p>
				<product-details :details=details></product-details>
				<p> Sizes Available: </p>
				<ul>
					<li v-for="size in sizes">{{ size }}</li>
				</ul>
				<div v-for="(variant, index) in variants" 
					:key="variant.variantId"
					class="color-box"
					:style="{ backgroundColor: variant.variantColor }"
					@mouseover="updateProduct(index)">
				</div>
				<p>You can buy socks <a :href="link">here</a></p>
				<p> Shipping: {{ shipping }} </p>

				<button @click="addToCart"
						:disabled="!inStock"
						:class="{ disabledButton: !inStock }"> Add to Cart </button>
				<button @click="removeFromCart"> Remove from Cart </button>

			</div>
		</div>
	`,
	data(){
		return {
			brand:'Vue Mastery',
			product: 'Socks',
			description: 'The finest socks in America!',
			/*image: 'images/socks_green.png',*/
			selectedVariant: 0,
			link: 'https://www.amazon.com',
			inventory: 50,
			onSale: false,
			details: ['80% cotton', '20% polyester', 'gender-neutral'],
			/*inStock: true,*/
			variants:[
				{
					variantId: 2234,
					variantColor: 'green',
					variantImage: 'images/socks_green.png',
					variantQuantity: 10,
					onSale: true
				},
				{
					variantId:2235,
					variantColor: 'blue',
					variantImage: 'images/socks_blue.png',
					variantQuantity: 0,
					onSale: false
				}
			],
			sizes: ['small', 'medium', 'large']
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
		},
		removeFromCart(){
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
		},
		updateProduct(index) {
			this.selectedVariant = index
		}
	},
	computed: {
		title() {
			return this.brand + " " + this.product
		},
		image() {
			return this.variants[this.selectedVariant].variantImage
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},
		isOnSale() {
			return this.variants[this.selectedVariant].onSale
		},
		shipping(){
			if(this.premium){
				return "Free"
			}
			return 2.99
		}
	}
})

Vue.component('product-details', {
	props: {
		details: {
			type: String,
			requried:false
		}
	},
	template: `
		<div>
			<p> Made From: </p>
			<ul>
				<li v-for="detail in details">{{ detail }}</li>
			</ul>
		</div>
	`
})

var app = new Vue({
	el: '#app',
	data: {
		premium: false,
		cart: []
	},
	methods: {
		addToCart(id){
			this.cart.push(id)
		},
		removeFromCart(id){
			var index = this.cart.indexOf(id);
			if (index > -1) {
  				this.cart.splice(index, 1);
			}
		}
	}
})

// var app = new Vue({
// 	el: '#app',
// 	data:{
// 		brand:'Vue Mastery',
// 		product: 'Socks',
// 		description: 'The finest socks in America!',
// 		/*image: 'images/socks_green.png',*/
// 		selectedVariant: 0,
// 		link: 'https://www.amazon.com',
// 		inventory: 50,
// 		onSale: false,
// 		details: ['80% cotton', '20% polyester', 'gender-neutral'],
// 		/*inStock: true,*/
// 		variants:[
// 			{
// 				varianteId: 2234,
// 				variantColor: 'green',
// 				variantImage: 'images/socks_green.png',
// 				variantQuantity: 10,
// 				onSale: true
// 			},
// 			{
// 				variantId:2235,
// 				variantColor: 'blue',
// 				variantImage: 'images/socks_blue.png',
// 				variantQuantity: 0,
// 				onSale: false
// 			}
// 		],
// 		sizes: ['small', 'medium', 'large'],
// 		cart: 0
// 	},
// 	methods: {
// 		addToCart() {
// 			this.cart += 1
// 		},
// 		removeFromCart(){
// 			if(this.cart != 0){
// 				this.cart -= 1
// 			}
// 		},
// 		updateProduct(index) {
// 			this.selectedVariant = index
// 		}
// 	},
// 	computed: {
// 		title() {
// 			return this.brand + " " + this.product
// 		},
// 		image() {
// 			return this.variants[this.selectedVariant].variantImage
// 		},
// 		inStock() {
// 			return this.variants[this.selectedVariant].variantQuantity
// 		},
// 		isOnSale() {
// 			return this.variants[this.selectedVariant].onSale
// 		}
// 	}
// })