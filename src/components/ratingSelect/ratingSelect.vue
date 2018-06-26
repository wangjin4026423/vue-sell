<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" :class="{'active':selectType === 2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{all.length}}</span></span>
			<span class="block positive" :class="{'active':selectType === 0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="block negative" :class="{'active':selectType === 1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
			<i class="icon-check_circle"></i><span>只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default {
		name: "ratingselect",
		data() {
			return {
				selectType: {
					type:Number,
					default:ALL
				},
				onlyContent: {
					type:Boolean,
					default: false
				}
			}
		},
		props: {
			ratings: {
				type:Array,
				default() {
					return [];
				}
			},

			desc: {
				type:Object,
				default() {
					return {
						all:"全部",
						positive:"满意",
						negative:"不满意"
					}
				}
			}
		},
		methods:{
			select(type,event) {
				if (!event._constructed) {
					return;
				}
				this.selectType = type;
				this.$emit('select',type);
			},
			toggleContent(event) {
				if (!event._constructed) {
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$emit('toggle');
			}
		},
		computed: {
			all() {
				return this.ratings.filter((rating) => {
					if (!this.onlyContent){
						return (rating.rateType === POSITIVE || rating.rateType === NEGATIVE);
					} else {
						return (rating.text !== "");
					}
				})
			},
			positives() {
				return this.ratings.filter((rating) => {
					if (!this.onlyContent){
						return rating.rateType === POSITIVE;
					} else {
						return (rating.rateType === POSITIVE && rating.text !== "");
					}
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					if (!this.onlyContent){
						return rating.rateType === NEGATIVE;
					} else {
						return (rating.rateType === NEGATIVE && rating.text !== "");
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/mixin.styl"

	.ratingselect
		.rating-type
			padding:18px 0
			margin: 0 18px
			border-1px(rgba(7,17,27,0.1))
			font-size:0
			.block
				line-height: 16px
				border-radius:2px
				margin-right: 8px
				display: inline-block
				padding: 8px 12px
				font-size: 12px
				color:rgb(77,85,93)
				&.active
					color:#fff
				.count
					font-size:8px
					margin-left:2px
				&.positive
					background: rgba(0,160,220,0.2)
					&.active
						background: rgb(0,160,220)
				&.negative
					background: rgba(77,85,93,0.2)
					&.active
						background: rgb(77,85,93)
		.switch
			font-size: 0
			padding:12px 18px
			border-bottom: 1px solid rgba(7,17,27,0.1)
			&.on
				.icon-check_circle
					color: #00c850
			.icon-check_circle
				color: rgb(147,153,159)
				margin-right: 4px
				font-size:24px
				line-height:24px
			span
				color: rgb(147,153,159)
				font-size:12px
				line-height: 24px
				vertical-align: top
</style>