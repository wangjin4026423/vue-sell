<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper border-1px">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item boder-1px" v-for="item in seller.supports">
						<span class="icon" v-bind:class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" alt="" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<div class="info">
				<h1 class="title border-1px">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
		<shopcart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '../star/star'
	import BScroll from 'better-scroll'
	import shopcart from '../shopcart/shopcart'

    export default {
        name: 'sellers',
		props: {
        	seller:{
        		type: Object
			}
		},
		data() {
        	return {
        		goods:[],
				favorite:false
			}
		},
		methods:{
        	_initScroll() {
        		if (!this.scroll) {
        			this.scroll = new BScroll(this.$refs.seller,{
        				click:true
					});
				} else {
        			this.scroll.refresh();
				}
			},
			_initPics() {
				if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if (!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						} else {
							this.picScroll.refresh();
						}
					});
				}
			},
			toggleFavorite() {
        		this.favorite = !this.favorite;
			}
		},
		computed:{
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			},
			favoriteText() {
				return this.favorite? '已收藏' : '收藏';
			}
		},
		watch: {
        	'seller'() {
        		this._initScroll();
        		this._initPics();
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		mounted() {
        	this.scroll = new BScroll(this.$refs.seller,{
        		click:true
			});
		},
		components:{
        	star,
			shopcart
		}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/mixin.styl"

	.seller
		position: absolute
		top: 174px
		bottom: 46px
		left: 0
		width: 100%
		background: #f3f5f7
		overflow: hidden
		.overview
			position: relative
			background: #fff
			padding:0 18px
			margin-bottom: 18px
			font-size:0
			.title
				color: rgb(7,17,27)
				line-height: 14px
				font-weight: 700
				margin-bottom: 8px
				padding-top: 18px
				font-size:14px
			.desc
				font-size:10px
				color: rgb(77,85,93)
				padding-bottom: 18px
				border-1px(rgba(7,17,27,0.1))
				line-height:18px
				.star
					display :inline-block
					margin-right:8px
				.text
					display: inline-block
					vertical-align top
					margin-right:12px
			.remark
				display: flex
				padding:18px 0
				border-bottom: 1px solid rgba(7,17,27,0.1)
				.block
					flex:1
					border-right: 1px solid rgba(7,17,27,0.1)
					font-size:0
					text-align: center
					&:last-child
						border: 0
					h2
						color: rgb(147,153,159)
						margin-bottom: 4px
						font-size:10px
						line-height:10px
					.content
						font-weight: 200
						color: rgb(7,17,27)
						line-height: 24px
						font-size:10px
						.stress
							font-size:24px
			.favorite
				position: absolute
				width: 50px
				right: 11px
				top: 18px
				text-align: center
				.icon-favorite
					display: block
					margin-bottom:4px
					line-height:24px
					font-size:24px
					color: #d4d6d9
					&.active
						color: rgb(240,20,20)
				.text
					text-align: center
					line-height:10px
					font-size:10px
					color: rgb(77,85,93)
		.bulletin
			font-size: 0
			padding: 18px
			padding-bottom: 0
			margin-bottom: 16px
			border-top: 1px solid rgba(7,17,27,0.1)
			border-1px(rgba(7,17,27,0.1))
			background: #fff
			margin-bottom:16px
			.title
				color: rgb(7,17,27)
				line-height: 14px
				font-weight: 700
				font-size:14px
			.content-wrapper
				font-size: 12px
				font-weight: 200
				color: rgb(240,20,20)
				line-height: 24px
				padding:8px 12px 16px
			.supports
				.support-item
					border-1px(rgba(7,17,27,0.1))
					padding:16px 12px
					&:last-child
						border-none()
					.icon
						display: inline-block
						width: 16px
						height: 16px
						vertical-align: middle
						margin-right: 6px
						background-size: 16px 16px
						background-repeat: no-repeat
						&.decrease
							bg-image('img/decrease_4')
						&.discount
							bg-image('img/discount_4')
						&.guarantee
							bg-image('img/guarantee_4')
						&.invoice
							bg-image('img/invoice_4')
						&.special
							bg-image('img/special_4')
					.text
						font-weight: 700
						vertical-align: middle
						color: rgb(7,17,27)
						line-height: 16px
						font-size:12px
		.pics
			padding:18px
			padding-right: 0
			background: #fff
			margin-bottom:16px
			border-1px(rgba(7,17,27,0.1))
			border-top: 1px solid rgba(7,17,27,0.1)
			.title
				color: rgb(7,17,27)
				line-height: 14px
				font-weight: 700
				margin-bottom: 12px
				font-size:14px
			.pic-wrapper
				width: 100%
				overflow: hidden
				white-space: nowrap
				.pic-list
					font-size:0
					.pic-item
						margin-right: 6px
						display: inline-block
		.info
			background: #fff
			border-top: 1px solid rgba(7,17,27,0.1)
			border-1px(rgba(7,17,27,0.1))
			padding: 18px 18px 0 18px
			color: rgb(7, 17, 27)
			.title
				padding-bottom: 12px
				line-height: 14px
				border-1px(rgba(7, 17, 27, 0.1))
				font-size: 14px
				font-weight:700
			.info-item
				padding: 16px 12px
				line-height: 16px
				border-1px(rgba(7, 17, 27, 0.1))
				font-size: 12px
				&:last-child
					border-none()
</style>
