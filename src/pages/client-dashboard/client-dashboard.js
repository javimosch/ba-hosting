module.exports = function() {
	return {
		name: 'console',
		enabled: true,
		path: '',
		context: {
			pageScripts: ["https://checkout.stripe.com/checkout.js"],
			head: {
				title: 'Console'
			},
			init: function init() {

				function getAvailableServices() {
					return [{
						"type": "COMMUNITY",
						"settings": {
							"stripeCheckoutDescription": "COMMUNITY Hosting Plan",
							"stripeCheckoutAmount": 0,
							"stripePlan": "prod_EJ5WYwpTMXOZiW"
						}
					}, {
						"type": "STARTUP",
						"settings": {
							"stripeCheckoutDescription": "STARTUP Hosting Plan",
							"stripeCheckoutAmount": 5000,
							"stripePlan": "plan_EJ3p7hgQRCLHrQ"
						}
					}, {
						"type": "ENTERPRISE",
						"settings": {
							"stripeCheckoutDescription": "ENTERPRISE Hosting Plan",
							"stripeCheckoutAmount": 10000,
							"stripePlan": "plan_EJ8yNQFUFMRqon"
						}
					}];

				}
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
						this.refreshServices();
					},
					computed: {
						availableServices() {
							var avail = getAvailableServices();
							return avail;
							return avail.filter(a => {
								var r = this.services.find(s => {
									return s.type == a.type;
								});
								return !r;
							});
						}
					},
					methods: {
						async refreshServices() {
							this.services = await window.ba.services.hired();
						},
						servicePrice(service) {
							return `${service.settings.stripeCheckoutAmount / 100} €/${SERVER.lang.MONTH}`;
						},
						canBuyPlan(service) {
							return service.state !== 'activated';
						},
						unbuyPlan(service) {

						},
						async buyPlan(service) {
							var service = this.services.find(s => s.type === service.type);
							var canCharge = await ba.payments().canCharge();
							if (canCharge) {
								await ba.payments().subscribe(service);
								await this.refreshServices();
							}else{
								subscribeWithModal();
							}

							function subscribeWithModal() {
								var handler = StripeCheckout.configure({
									key: 'pk_test_MDkxtBLcBpHwMCgkqX2dJHjO',
									image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
									locale: 'auto',
									source: async (source) => {
										await ba.payments().configureUser(source, service);
										await this.refreshServices();
									}
								});
								handler.open({
									name: 'MisitioBA',
									description: service.settings.stripeCheckoutDescription,
									zipCode: true,
									currency: 'eur',
									amount: service.settings.stripeCheckoutAmount
								});
							}
						},
						serviceState(item) {
							var label = {
								activated: SERVER.lang.STATE_ACTIVATED,
								created: SERVER.lang.STATE_CREATED
							};
							return label[item.state];
						},
						openService(item) {
							if (item.state === 'activated') {
								window.routeTo(`/service-details?id=${item._id}`);
							} else {
								console.log("Service is not active")
							}
						},
						serviceLabel(item) {
							return ({
								COMMUNITY: 'Community Plan',
								STARTUP: 'Startup Plan',
								ENTERPRISE: 'Enterprise Plan'
							})[item.type];
						}
					}
				});
			}
		}
	}
}