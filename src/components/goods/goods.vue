<template>
	<div class="goods">
		<div class="goodsbox">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentInedx===index}" @click="selectMenu(index)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodWrapper">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
								<div class="icon">
									<img :src="food.icon" alt="" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food" v-on:cartAdd="addFood"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></shopcart>
		</div>
		<food :food="selectedFood" ref="food" @add="addFood"></food>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import shopcart from '../shopcart/shopcart'
	import cartcontrol from '../cartcontrol/cartcontrol'
	import  food from '../food/food'

	const ERR_OK = 0;

	export default {
		name: 'Goods',
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods:[],
				listHeight:[],
				scrollY: 0,
				selectedFood:{}
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodScroll = new BScroll(this.$refs.foodWrapper,{
					click:true,
					probeType: 3
				});
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight() {
				let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index) {
				let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
				let el = foodList[index];
				this.foodScroll.scrollToElement(el,300);
			},
			selectFood(food,event) {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			},
			_drop(target) {
				//体验优化，异步执行下落
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				})
			},
			addFood(target) {
				this._drop(target);
			},
		},
		computed: {
			currentInedx() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
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
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

			this.$http.get('/api/goods').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/mixin"

	.goodsbox
		display: flex
		width: 100%
		overflow: hidden
		position: absolute
		top:174px
		bottom:46px
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height:54px
				line-height:14px
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight:700
					.text
						border-none()
				.text
					width: 56px
					display: table-cell
					vertical-align:middle
					padding: 0 12px
					font-size:12px
					border-1px(rgba(7,17,27,0.1))
					.icon
						display: inline-block
						vertical-align: middle
						width: 12px
						height: 12px
						margin-right:2px
						background-size: 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('img/decrease_3')
						&.discount
							bg-image('img/discount_3')
						&.guarantee
							bg-image('img/guarantee_3')
						&.invoice
							bg-image('img/invoice_3')
						&.special
							bg-image('img/special_3')
		.foods-wrapper
			flex: 1
			.title
				line-height: 26px
				border-left: 2px solid #d9dde1
				padding-left:14px
				font-size: 12px
				color: rgb(147,153,159)
				background: #f3f5f7
				height:26px
			.food-item
				display: flex
				margin:18px
				padding-bottom: 18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
				.icon
					margin-right: 10px
					flex:0 0 57px
				.content
					flex:1
					.name
						height: 14px
						line-height: 14px
						font-size: 14px
						color: rgb(7,17,27)
						margin:2px 0 8px 0
					.desc,.extra
						color: rgb(147,153,159)
						font-size: 10px
						line-height: 12px
					.desc
						margin-bottom:10px
					.extra
						.count
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
						right: 0
						bottom: 12px
</style>
