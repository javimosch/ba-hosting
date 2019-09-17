module.exports = function() {
	return {
		name: 'pages',
		enabled: true,
		path: 'cms',
		context: {
			head:{
				title:'CMS Pages'
			},
			pageScripts:['/js/cms-sidebar.js'],
			init: function init() {
				
				vues['cmsPages']=new Vue({
					el: '.appScope',
					name: 'cmsPages',
					data() {
						return {
							items:[]	
						}
					},
					async created() {
						this.items = await ba.cms().pages();
					},
					async mounted() {
						
					},
					methods:{
						postPhysicFolderLabel(item){
							return item && `Physical location: ${item.physicRelativePath}`;
						},
						postTitle(item){
							return item && item.name
						},
						postThumbImage(item){
							return item && item.settings && item.settings.post && item.settings.post.thumbImage || 'https://via.placeholder.com/150'
						},
						postShortDescription(item){
							return item && item.settings && item.settings.post && item.settings.post.shortDescription || '(No short description)';
						},
						postEditUrl(item){
							let projectId=(new URL(window.location.href)).searchParams.get("id");
							return `/cms/page-details?id=${projectId}&postId=${item.name}`;
						}
					},
					computed: {
					
					}
				});
			}
		}
	}
}