module.exports = function() {
	return {
		name: 'console',
		enabled:true,
		path: '',
		context: {
			init: function init() {
				new Vue({
					el: '.container',
					name: 'clientDashboard',
					data() {
						return {
						}
					},
					created() {
						
					},
					mounted() {
						console.log('dash2')
					},
					methods: {
						
					}
				});
			}
		}
	}
}