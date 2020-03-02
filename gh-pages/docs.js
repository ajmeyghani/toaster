import docsTemplate from "./docs.tpl.js";
Vue.component("docs", {
  data: function() {
    return {
      message: "",
      title: "",
      dismiss: "",
      toaster: window.toaster,
      options: "{}",
      animation: "appear"
    };
  },
  mounted() {
    this.$watch(
      vm => [vm.title, vm.message, vm.dismiss, vm.animation],
      val => {
        this.dismiss = Number(this.dismiss);
        this.options = JSON.stringify(
          { title: val[0], dismiss: val[2], annimation: val[3] },
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
