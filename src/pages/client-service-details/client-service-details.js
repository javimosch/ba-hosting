module.exports = function() {
	return {
		name: 'service-details',
		enabled: true,
		path: '',
		context: {
			head:{
				title:'Service details'
			},
			init: function init() {
				new Vue({
					el: '.container',
					name: 'clientServiceDetails',
					data() {
						return {
							user: null,
							service: {}
						}
					},
					created() {

					},
					async mounted() {
						this.user = await window.ba.user.profile();
						var id = window.location.href.split('id=')[1]
						this.service = await window.ba.services.findbyId(id);
					},
					methods:{
						projectPrimaryDomain(item){
							return item.domain;
						},
					},
					computed: {
						serviceLabel() {
							var type = this.service.type;
							return ({
								COMMUNITY: 'Community Plan',
								STARTUP: 'Startup Plan',
								ENTERPRISE: 'Enterprise Plan'
							})[type];
						}
					}
				});
			}
		}
	}
}