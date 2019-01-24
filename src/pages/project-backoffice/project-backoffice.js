module.exports = function() {
	return {
		name: 'my-project',
		enabled: true,
		context: {
			init: function init() {


				function createComponents() {
					Vue.component('new-record-form', {
						template: `
						<div class="prRecordForm">
							<p v-html="'New '+model&&model.name+' record'"></p>
							<p v-html="messages.draftMsg"></p>
							<div v-for="field in  model&&model.fields||[]">					
								<record-field v-model="newRecord[field.name]" :field="field"></record-field>
							</div>
						</div>
						`,
						props: ['model'],
						data() {
							return {
								newRecord: {},
								messages: {
									draftMsg: ''
								}
							}
						}
					});
					Vue.component('quill-editor', {
						template: window.quillEditor.template,
						data: function() {
							return {
								editor: null
							}
						},
						mounted: function() {
							window.quillEditor.loadDeps(() => this.init());
						},
						props: ['value'],
						watch: {
							value: function() {
								//this.editor&&this.editor.setHtml(this.value);
							}
						},
						methods: {
							init() {
								Quill.prototype.getHtml = function() {
									return this.container.querySelector('.ql-editor').innerHTML;
								};
								Quill.prototype.setHtml = function(html) {
									return this.container.querySelector('.ql-editor').innerHTML = html;
								};
								this.$refs.editor.id = 'HE' + Math.random().toString(36).substr(2, 9);
								this.$refs.toolbar.id = 'HE' + Math.random().toString(36).substr(2, 9);
								this.editor = new Quill(`#${this.$refs.editor.id}`, {
									theme: 'snow',
									modules: {
										toolbar: `#${this.$refs.toolbar.id}`
									}
								});
								this.editor.on('text-change', (delta, oldDelta, source) => {
									let html = this.editor.getHtml();
									this.$emit('input', html);
								});
								this.editor&&this.editor.setHtml(this.value||'');
							}
						}
					});
					Vue.component('record-field', {
						template: `
						<div>
							<label class="prRecordFieldLabel" v-html="label"></label>
							<component v-bind:is="field.vueComponent" v-model="val"></component>
						</div>
						`,
						props: ['field', 'value'],
						data() {
							return {
								val: this.value
							}
						},
						watch: {
							val() {
								this.$emit('input', this.val);
							}
						},
						computed: {
							label() {
								var label = this.field && this.field.label || this.field.name
								return label.charAt(0).toUpperCase() + label.substring(1);
							}
						}
					})
					Vue.component('vue-input', {
						template: `<input  v-model="val" placeholder="Enter value"/>`,
						props: ['value'],
						data() {
							return {
								val: this.value
							}
						},
						watch: {
							val() {
								this.$emit('input', this.val);
							}
						}
					})
				}

				vues['main'] = new Vue({
					el: '.appScope',
					name: 'main',
					data() {
						return {
							view: 'new-record',
							pr: {},
							collection: null
						}
					},
					async created() {
						createComponents();
						this.pr = {
							name: "mys",
							collections: [{
								name: "blog",
								fields: [{
									name: "title",
									vueComponent: 'vue-input'
								}, {
									name: "message",
									vueComponent: 'quill-editor'
								}]
							}]
						}
						this.collection = this.pr.collections[0]
					},
					async mounted() {

					},
					methods: {
						toView(view) {
							this.view = view;
						},
						browseCollection() {

						},
						addToCollection(item) {
							this.newRecord = {}
							this.collection = item;
							this.toView('new-record');
						}
					},
					computed: {
						sectionTitle() {
							return this.view.toUpperCase();
						}
					}
				});
			}
		}
	}
}