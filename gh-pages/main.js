import docsTemplate from "./docs.tpl.js";

Vue.component("docs", {
  data: function() {
    return {
      message: "",
      title: "",
      dismiss: "",
      toaster: window.toaster,
      options: "{}"
    };
  },
  mounted() {
    this.$watch(
      vm => [vm.title, vm.message, vm.dismiss],
      val => {
        this.dismiss = Number(this.dismiss);
        this.options = JSON.stringify(
          { title: val[0], dismiss: val[2] },
          null,
          2
        );
      },
      {
        immediate: true,
        deep: true
      }
    );
  },
  template: docsTemplate
});

new Vue({ el: "#app" });

window.app = app;
