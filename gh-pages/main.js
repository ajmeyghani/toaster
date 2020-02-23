// import toaster from "../src/index.js";

import { useToaster } from "../src/index.js";
const toaster = useToaster({ theme: "default", animation: "slide-down" });

toaster.success("Good job, you are running the gh-pages successfully!.", { dismiss: false });

const app = new Vue({
  el: "#app",
  data: {
    message: "",
    title: "",
    dismiss: "",
    toaster: toaster,
    options: "{}"
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
  methods: {
    // success: function (message, options) {
    //   return this.toaster.success(message, options)
    // },
  }
});

window.app = app;
