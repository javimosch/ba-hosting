var quillEditor = {
  template: `
<div class="HTMLEditor">
<div ref="toolbar">
  <span class="ql-formats">
  <select class="ql-font"></select>
  <select class="ql-size"></select>
  </span>
  <span class="ql-formats">
  <button class="ql-bold"></button>
  <button class="ql-italic"></button>
  <button class="ql-underline"></button>
  <button class="ql-strike"></button>
  </span>
  <span class="ql-formats">
  <select class="ql-color"></select>
  <select class="ql-background"></select>
  </span>
  <span class="ql-formats">
  <button class="ql-script" value="sub"></button>
  <button class="ql-script" value="super"></button>
  </span>
  <span class="ql-formats">
  <button class="ql-header" value="1"></button>
  <button class="ql-header" value="2"></button>
  <button class="ql-blockquote"></button>
  <button class="ql-code-block"></button>
  </span>
  <span class="ql-formats">
  <button class="ql-list" value="ordered"></button>
  <button class="ql-list" value="bullet"></button>
  <button class="ql-indent" value="-1"></button>
  <button class="ql-indent" value="+1"></button>
  </span>
  <span class="ql-formats">
  <button class="ql-direction" value="rtl"></button>
  <select class="ql-align"></select>
  </span>
  <span class="ql-formats">
  <button class="ql-link"></button>
  <button class="ql-image"></button>
  <button class="ql-video"></button>
  <button class="ql-formula"></button>
  </span>
  <span class="ql-formats">
  <button class="ql-clean"></button>
  </span>
</div>
<div ref="editor">
</div>
</div>`,
  loadDeps: (next) => {
    if (window.Quill === undefined) {
      if (document.head.innerHTML.indexOf('quill') == -1) {
        var link = document.createElement('link')
        link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css'
        link.rel = 'stylesheet'
        document.head.appendChild(link);
      }
      var script = document.createElement('script')
      script.src = "https://cdn.quilljs.com/1.3.6/quill.js"
      document.body.appendChild(script);
      check();

      function check() {
        if (window.Quill === undefined) return setTimeout(check, 100)
        next();
      }
    } else {
      next()
    }
  }
}

Vue.component('html-editor', {
  template: quillEditor.template,
  data: function() {
    return {
      quill: null,
      firstLoad: false
    }
  },
  mounted: function() {
    quillEditor.loadDeps(()=>this.init());
  },
  props: ['value'],
  watch: {
    value: function() {
      if (!this.firstLoad) {
        this.setHtml();
      }
    }
  },
  methods: {
    setHtml() {
      if (!!this.quill && !!this.value) {
        this.quill.setHtml(this.value);
        this.firstLoad = true;
      }
    },
    init() {
      Quill.prototype.getHtml = function() {
        return this.container.querySelector('.ql-editor').innerHTML;
      };
      Quill.prototype.setHtml = function(html) {
        return this.container.querySelector('.ql-editor').innerHTML = html;
      };
      this.$refs.editor.id = 'HE' + Math.random().toString(36).substr(2, 9);
      this.$refs.toolbar.id = 'HE' + Math.random().toString(36).substr(2, 9);
      this.quill = new Quill(`#${this.$refs.editor.id}`, {
        theme: 'snow',
        modules: {
          toolbar: `#${this.$refs.toolbar.id}`
        }
      });
      this.quill.on('text-change', (delta, oldDelta, source) => {
        if (!this.firstLoad) {
          return false;
        }
        let html = this.quill.getHtml();
        this.$emit('input', html);
      });
      this.setHtml();
    }
  }
});



Vue.component('codemirror', {
  props: ['value', 'enabled', 'mode'],
  template: `<div  class="codemirror-component">
						<div ref="editor" style="width: -webkit-fill-available;min-height: calc(100vh);"></div>
					</div>`,
  data() {
    return {
      editor: null,
      init: false,
      activated: false
    }
  },
  watch: {
    value() {
      if (!!this.editor && !this.init) {
        this.editor.setValue(this.value, -1);
        this.init = true;
      }
    },
    enabled() {
      if (this.enabled === true && !this.activated) {
        this.activate();
      }
    }
  },
  methods: {
    setValue(data) {
      this.editor.setValue(data, -1);
    },
    activate() {
      if (this.activated) return;
      this.activated = true;
      var editor = ace.edit(this.$refs.editor);
      editor.setTheme("ace/theme/monokai");
      editor.session.setMode(`ace/mode/${this.mode||'javascript'}`);
      this.editor = editor;
      this.editor.on('change', () => {
        var value = this.editor.getValue();
        this.$emit('input', value);
      });
      this.editor.setFontSize(16);
      if (!!this.value) {
        this.editor.setValue(this.value, -1);
      }
    }
  },
  mounted() {
    if (this.enabled || this.enabled === undefined) {
      this.activate();
    }
  }
});