// import toaster from "../src/index.js";

import { useToaster } from "../src/index.js";
const toaster = useToaster({ theme: "default" });

const app = new Vue({
  el: "#app",
  data: {
    message: "",
    title: "",
    dismiss: "",
    toaster: toaster,
    options: "{}",
  },
  mounted() {
    this.$watch(
      vm => [vm.title, vm.message, vm.dismiss],
      val => {
        this.dismiss = Number(this.dismiss);
        this.options = JSON.stringify({title: val[0], dismiss: val[2]}, null, 2)
      },
      {
        immediate: true, // run immediately
        deep: true // detects changes inside objects. not needed here, but maybe in other cases
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
