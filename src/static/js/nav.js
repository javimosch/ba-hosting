(() => {
	new Vue({
		el: '.navScope',
		name: 'nav',
		data() {
			return {
				isLogged: false
			}
		},
		async created() {
			window.ba.auth.check().then(isLogged => {
				this.isLogged=isLogged;
			});
		},
		async mounted() {

		},
		methods: {

		},
		computed: {

		}
	});
})();