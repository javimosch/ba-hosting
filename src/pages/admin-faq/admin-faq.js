module.exports = function() {
	return {
		name: 'faq',
		path: 'admin',
		enabled:false,
		context: {
			type: 'admin',
			init: function init() {
				new Vue({
					el: '.admin',
					name: 'adminFaq',
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