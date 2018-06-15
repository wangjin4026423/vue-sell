<template>
	<transition name="move">
		<div class="food" v-show="showFlag">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
				</div>
			</div>
		</div>
	</transition>

</template>

<script type="text/ecmascript-6">
	export default {
		name: "food",
		props: {
			food:{
				type:Object
			}
		},
		data() {
			return {
				showFlag: false
			}
		},
		methods: {
			show(){
				this.showFlag = true;
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/mixin"

	.food
		position: fixed
		bottom: 48px
		left: 0
		top: 0
		z-index: 30
		width: 100%
		background: #fff
		transform: translate3d(0,0,0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.2s linear
		&.move-enter, &.move-leave-active
			transform: translate3d(100%, 0, 0)
		.image-header
			width: 100%
			height: 0
			padding-top: 100%
			position: relative
			img
				top: 0
				left: 0
				width: 100%
				height: 100%
				position: absolute
</style>