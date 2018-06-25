<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count || food.count === 0" v-on:click.stop.prevent="addFirst">加入购物车</div>
					</transition>
				</div>
				<div class="food-info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<div class="ratings">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @select="selectRating" @toggle="toggleContent"></ratingselect>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import Vue from 'vue'
	import cartcontrol from '../cartcontrol/cartcontrol'
	import ratingselect from '../ratingSelect/ratingSelect'

	const ALL = 2;

	export default {
		name: "food",
		props: {
			food: {
				type: Object
			}
		},

		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = 1;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				});
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				if (!event._constructed) {
					return;
				}
				this.$emit('cartAdd',event.target);
				Vue.set(this.food,'count',1);
			},
			selectRating(type) {
				this.selectType = type;
				this.$nextTick(() =>{
					this.scroll.refresh();
				})
			},
			toggleContent() {
				this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		},
		components:{
			cartcontrol,
			ratingselect
		},
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
		background: #f3f5f7
		transform: translate3d(0,0,0)
		&.move-enter-active, &.move-leave-active
			transition: all 0.2s linear
		&.move-enter, &.move-leave-active
			transform: translate3d(100%, 0, 0)
		.food-content
			background: #fff
			border-bottom: 1px solid rgba(7,17,27,0.1)
			margin-bottom: 16px
			.image-header
				width: 100%
				height: 0
				padding-top: 100%
				position: relative
				img
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
				.back
					position: absolute
					top: 10px
					left: 0
					.icon-arrow_lift
						display: block
						padding: 10px
						font-size: 20px
						color: #fff
			.content
				position: relative
				padding:18px
				.title
					margin-bottom: 8px
					font-size: 14px
					font-weight: 700
					color: rgb(7,17,27)
					line-height:14px
				.detail
					line-height: 10px
					font-size: 0
					height: 10px
					margin-bottom:18px
					.sell-count,.rating
						color: rgb(147,153,159)
						font-size:10px
					.sell-count
						margin-right:12px
				.price
					font-weight:700
					line-height:24px
					.now
						color: rgb(240,20,20)
						margin-right:8px
						font-size:14px
					.old
						font-size: 10px
						color:rgb(147,153,159)
						text-decoration line-through
			.cartcontrol-wrapper
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				z-index: 10
				height: 24px
				line-height: 24px
				padding: 0 12px
				box-sizing: border-box
				font-size: 10px
				border-radius: 12px
				color:#fff
				background: rgb(0,160,220)
				position: absolute
				right: 18px
				bottom: 18px
				&.fade-enter-active,&.fade-leave-active
					transition: all 0.2s
					opacity:1
				&.fade-enter,&.fade-leave
					opacity:0
					background: rgba(7,17,27,0)
		.food-info
			background: #fff
			border-top: 1px solid rgba(7,17,27,0.1)
			border-bottom: 1px solid rgba(7,17,27,0.1)
			margin-bottom: 16px
			padding:18px
			.title
				margin-bottom: 6px
				font-size: 14px
				color: rgb(7,17,27)
				font-weight: 700
				line-height:14px
			.text
				padding:0 8px
				/*font-weight: 200*/
				color:rgb(77,85,93)
				font-size:12px
				line-height:24px
		.ratings
			background: #fff
			border-top: 1px solid rgba(7,17,27,0.1)
			padding:18px 0
			.title
				font-size: 14px
				padding-left: 18px
				line-height: 14px
				color:rgb(7,17,27)
				font-weight: 700
				margin-bottom: 6px
</style>