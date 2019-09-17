window.bootstrapScripts = window.bootstrapScripts || [];
window.bootstrapScripts.push(initCmsSidebar);
initCmsSidebar();
function initCmsSidebar() {
	vues['cmsSidebar'] = new Vue({
		el: '.cmsSidebar',
		name: 'cmsSidebar',
		data() {
			return {

			}
		},
		created() {

		},
		async mounted() {

		},
		methods: {
			linkTo(uri) {
				var id = window.location.href.split('id=')[1];
				return `${uri}?id=${id}`;
			}
		},
		computed: {

		}
	});
}