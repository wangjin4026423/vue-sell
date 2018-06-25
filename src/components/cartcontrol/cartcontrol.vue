<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
		</transition>
			<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
			<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';

	export default {
		name: "cartcontrol",
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(event) {
				if (!event._constructed) {
					return;
				}
				if(!this.food.count) {
					Vue.set(this.food,'count',1);
				}else{
					this.food.count ++;
				}
				this.$emit('cartAdd',event.target);
			},
			decreaseCart() {
				if (!event._constructed) {
					return;
				}
				if (this.food.count){
					this.food.count --;
				}
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.cartcontrol
		font-size:0
		.cart-decrease,.cart-count,.cart-add
			display: inline-block
			padding:6px
			line-height: 24px
			font-size:24px
			color:rgb(0,160,220)
			transition: all 0.2s linear
			&.move-transition
				opacity:1
				transform : translate3d(0,0,0)
				.cart-decrease
					transition: all 0.2s linear
					transform: rotate(0)
			&.move-enter,&.move-leave-to
				opacity:0
				transform: translate3d(24px,0,0)
				.cart-decrease
					transition: all 0.4s linear
					transform: rotate(180deg)
		.cart-count
			font-size:10px
			vertical-align: top
			width: 12px
			padding-top: 6px
			text-align: center
			color: rgb(147,153,159)

</style>