module.exports = function() {
	return {
		name: 'client-area',
		enabled: true,
		path: '',
		context: {
			init: function init() {
				new Vue({
					el: '.container',
					name: 'clientLogin',
					data() {
						return {
							email: '',
							password: ''
						}
					},
					created() {

					},
					mounted() {
						window.ba.auth.check().then(isLogged => {
							console.warn(isLogged)
							if (isLogged) {
								window.location.href = "/console";
							}
						});
					},
					methods: {
						login() {
							window.ba.auth.loginWithCredentials(this.email, this.password).then(done => {
								if (done) {
									window.location.href = "/console";
								}
							});
						}
					}
				});
			}
		}
	}
}