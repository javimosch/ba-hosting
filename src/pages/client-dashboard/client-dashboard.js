module.exports = function() {
	return {
		name: 'console',
		enabled: true,
		path: '',
		context: {
			head:{
				title:'Console'
			},
			init: function init() {
				new Vue({
					el: '.container',
					name: 'clientDashboard',
					data() {
						return {
							user: null,
							services: []
						}
					},
					created() {

					},
					async mounted() {
						this.user = await window.ba.user.profile();
						this.services = await window.ba.services.hired();
					},
					methods: {
						openService(item){
							window.location.href=`/service-details?id=${item._id}`
						},
						serviceLabel(type){
							return ({
								COMMUNITY:'Static Hosting Plan for Developers (SFTP + 1 Website + Content Editor)',
								STARTUP:'Static Hosting Plan for Startups (SFTP + 5 Websites + Content Editor)',
								ENTERPRISE:'Static Hosting Plan for Companies (SFTP + 20 Websites + Content Editor)'
							})[type];
						}
					}
				});
			}
		}
	}
}