module.exports = function() {
	return {
		name: 'posts',
		enabled: true,
		path: 'cms',
		context: {
			head:{
				title:'CMS Posts'
			},
			pageScripts:['/js/cms-sidebar.js'],
			init: function init() {
				new Vue({
					el: '.appScope',
					name: 'cmsPosts',
					data() {
						return {
							posts:[]	
						}
					},
					async created() {
						this.posts = await ba.cms().pages();
					},
					async mounted() {
						
					},
					methods:{
						postTitle(item){
							return item && item.settings && item.settings.post && item.settings.post.title || '(No title)';
						},
						postThumbImage(item){
							return item && item.settings && item.settings.post && item.settings.post.thumbImage || 'https://via.placeholder.com/150'
						},
						postShortDescription(item){
							return item && item.settings && item.settings.post && item.settings.post.shortDescription || '(No short description)';
						},
						postEditUrl(item){
							let projectId=(new URL(window.location.href)).searchParams.get("id");
							return `/cms/post-details?id=${projectId}&postId=${item.name}`;
						}
					},
					computed: {
					
					}
				});
			}
		}
	}
}