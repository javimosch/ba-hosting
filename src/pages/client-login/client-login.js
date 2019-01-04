module.exports = function() {
	return {
		name: 'client-area',
		enabled:true,
		path: '',
		context: {
			init: function init() {
				new Vue({
					el: '.container',
					name: 'clientLogin',
					data() {
						return {
						}
					},
					created() {
						
					},
					mounted() {},
					methods: {
						
					}
				});
			}
		}
	}
}