module.exports = function() {
	return {
		name: 'cms',
		enabled: true,
		path: '',
		context: {
			head:{
				title:'CMS Home'
			},
			pageScripts:['/js/cms-sidebar.js'],
			init: function init() {
				new Vue({
					el: '.appScope',
					name: 'cmsHome',
					data() {
						return {
							
						}
					},
					created() {
						var id = window.location.href.split('id=')[1];
						window.location.href=`/cms/posts?id=${id}`;
					},
					async mounted() {
						
					},
					methods:{
						linkTo(uri){
							var id = window.location.href.split('id=')[1];
							return `${uri}?id=${id}`;
						}
					},
					computed: {
					
					}
				});
			}
		}
	}
}