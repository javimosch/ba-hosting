module.exports = function(options, config, context) {
	return {
		name: context.lang.PAGE_REGISTER,
		enabled: true,
		path: '',
		context: {
			head:{
				title:'Register free static web hosting'
			},
			init: function init() {
				new Vue({
					el: '.appScope',
					name: 'seoRegister',
					data() {
						return {
						
						}
					},
					async created() {
						
					},
					async mounted() {
						
					},
					methods:{
					
					},
					computed: {
					
					}
				});
			}
		}
	}
}