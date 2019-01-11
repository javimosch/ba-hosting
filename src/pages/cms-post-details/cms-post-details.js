module.exports = function() {
	return {
		name: 'post-details',
		enabled: true,
		path: 'cms',
		context: {
			pageLinks: ['https://cdn.quilljs.com/1.3.6/quill.snow.css'],
			head: {
				title: 'CMS Post details'
			},
			pageScripts: ['/js/cms-sidebar.js', 'https://cdn.quilljs.com/1.3.6/quill.js'],
			init: function init() {
				new Vue({
					el: '.appScope',
					name: 'cmsPostDetails',
					data() {
						return {
							dirty: false,
							firstLoad: false,
							savedAtValue: null,
							showSavedAt: false,
							item: {
								settings: {}
							}
						}
					},
					watch: {
						"item.html": function() {
							if (this.firstLoad) {
								this.onDirtyData();
								//this.setHtml();
							}
						},
						"item.settings.title": function() {
							this.onDirtyData();
						}
					},
					async created() {
						let postId = (new URL(window.location.href)).searchParams.get("postId");
						this.item = await ba.cms().post(postId);
						this.item.postId = postId;
						setTimeout(() => this.firstLoad = true, 3000);
					},
					async mounted() {
						/*
						this.quill = new Quill('#editor', {
							theme: 'snow',
							modules: {
								toolbar: '#toolbar'
							}
						});
						this.quill.on('text-change', (delta, oldDelta, source) => {
							this.item.html = this.quill.getText();
							this.onDirtyData();
						});
						this.setHtml();
						*/
						this.startSaveInterval();
						this.firstLoad = true;
					},
					computed: {
						savedAtLabel() {
								if (!!this.savedAtValue) {
									return `Saved at ${ this.savedAtValue.format('HH:mm:ss')}`;
								} else {
									return '';
								}
							},
							postTitle() {
								let item = this.item;
								return item && item.settings && item.settings && item.settings.title || '(No title)';
							},
							postThumbImage() {
								let item = this.item;
								return item && item.settings && item.settings.post && item.settings.post.thumbImage || 'https://via.placeholder.com/150'
							},
							postShortDescription() {
								let item = this.item;
								return item && item.settings && item.settings.post && item.settings.post.shortDescription || '(No short description)';
							},
					},
					destroyed() {
						if (!!this.interval) {
							window.clearInterval(this.interval);
						}
					},
					methods: {
						startSaveInterval() {
								this.interval = setInterval(async() => {
									if (this.dirty) {
										this.dirty = false;
										try {
											await window.ba.cms().postSave(Object.assign({}, this.item, {
												projectId: null
											}));
											this.showSavedAt = true;
											this.savedAtValue = moment();
										} catch (err) {
											this.dirty = true;
										}
									}
								}, 4000);
							},
							onDirtyData() {
								if (!this.firstLoad) {
									return;
								}
								console.warn('MANUAL CHANGE')
								this.dirty = true;
							},
							setHtml() {
								if (!!this.quill && !!this.item.html) {
									this.quill.setText(this.item.html);
								}
							},
							goBack() {
								let projectId = (new URL(window.location.href)).searchParams.get("id");
								return `/cms/posts?id=${projectId}`;
							}
					}
				});
			}
		}
	}
}