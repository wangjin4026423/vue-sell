<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<p class="title">综合评分</p>
					<span class="rank">高于周边商家{{seller.rankRate}}%</span>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span><star :size="36" :score="seller.serviceScore"></star><span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span><star :size="36" :score="seller.foodScore"></star><span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span><span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @select="selectRating" @toggle="toggleContent"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" alt="" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span><span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import star from '../star/star'
	import {formatDate} from '../../common/js/date'
	import ratingselect from '../ratingSelect/ratingSelect'

	const ALL = 2;
	const ERR_OK = 0;

    export default {
        name: 'ratings',
		props: {
        	seller:{
        		type:Object
			}
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		methods: {
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
			},
			needShow(type,text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		created() {
        	this.$http.get('/api/ratings').then((response) => {
        		response = response.body;
        		if (response.errno === ERR_OK) {
        			this.ratings = response.data;
					// console.log(this.ratings);
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings,{
							click:true
						});
					});
				}
			});
		},
		components: {
        	star,
			ratingselect
		}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/mixin.styl"

	.ratings
		width: 100%
		position: absolute
		left: 0
		top: 174px
		bottom: 0
		overflow: hidden
		background: #f3f5f7
		.overview
			display: flex
			padding: 18px 0
			background: #fff
			margin-bottom:16px
			border-bottom: 1px solid rgba(7,17,27,0.1)
			.overview-left
				width: 137px
				padding: 6px 0
				border-right: 1px solid rgba(7,17,27,0.1)
				text-align: center
				font-size: 0
				flex:0 0 137px
				@media only screen and (max-width: 320px)
					flex: 0 0 120px
					width: 120px
				.score
					font-size:24px
					color: rgb(255,153,0)
					line-height:28px
					margin-bottom:6px
				.title
					font-size:12px
					color: rgb(7,17,27)
					line-height: 12px
					font-weight:700
					margin-bottom:8px
				.rank
					font-size:10px
					color: rgb(7,17,27)
					line-height: 10px
			.overview-right
				flex:1
				font-size: 0
				padding: 6px 0 6px 24px
				@media only screen and (max-width: 320px)
					padding-left: 6px
				.score-wrapper
					margin-bottom: 8px
					font-size:0
					.title
						display: inline-block
						font-size: 12px
						line-height: 18px
						color: rgb(7,17,27)
						font-weight: 700
					.star
						display: inline-block
						vertical-align: top
						margin: 0 12px
					.score
						display: inline-block
						line-height: 18px
						vertical-align: top
						font-size: 12px
						color: rgb(255, 153, 0)
				.delivery-wrapper
					font-size:0
					.title
						color: rgb(7,17,27)
						line-height: 18px
						font-size:12px
						margin-right:12px
					.delivery
						color: rgb(147,153,159)
						line-height: 18px
						font-size:12px
		.ratingselect
			background: #fff
		.rating-wrapper
			background: #fff
			padding:0 18px
			.rating-item
				display: flex
				padding: 18px 0
				border-bottom:1px solid rgba(7,17,27,0.1)
				.avatar
					flex: 0 0 28px
					width: 28px
					margin-right: 12px
					img
						border-radius 50%
				.content
					position: relative
					flex: 1
					.name
						color:rgb(7,17,27)
						line-height: 12px
						font-size:10px
						margin-bottom:4px
					.star-wrapper
						font-size: 0
						margin-bottom: 6px
						.star
							margin-right: 6px
							vertical-align: top
							display: inline-block
						.delivery
							vertical-align: top
							font-size: 10px
							line-height: 12px
							color: rgb(147,153,159)
							display: inline-block
					.text
						color: rbg(7,17,27)
						font-weight: 700
						line-height: 18px
						font-size:12px
					.recommend
						font-size: 0
						line-height: 16px
						.icon-thumb_up,.item
							display: inline-block
							font-size: 9px
							margin: 0 8px 4px 0
						.icon-thumb_up
							line-height: 16px
							color: rgb(0,160,220)
						.item
							padding: 0 6px
							line-height: 16px
							color: rgb(147,153,159)
							background: #fff
							border-radius: 2px
							border:1px solid rgba(7,17,27,0.1)
					.time
						font-size: 10px
						font-weight: 700
						color: rgb(147,153,159)
						line-height: 12px
						margin-right: 18px
						position: absolute
						top: 0
						right: 0
</style>
