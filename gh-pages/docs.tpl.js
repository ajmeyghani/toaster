const template = `
<div class="sections">
  <h1 class="subtitle is-2">🍞 Vanilla Toaster</h1>
  <h2 class="subtitle is-4">Make a Toast</h2>

  <slot></slot>

  <section>
    <button
      id="test-success-button"
      v-on:click="toaster.success(message, {dismiss, title})"
      class="button is-success"
    >
      Success
    </button>
    <button
      id="test-failure-button"
      v-on:click="toaster.failure(message, {dismiss, title})"
      class="button is-danger"
    >
      Failure
    </button>
    <button
      id="test-info-button"
      v-on:click="toaster.info(message, {dismiss, title})"
      class="button is-info"
    >
      Info
    </button>
    <button
      id="test-warning-button"
      v-on:click="toaster.warning(message, {dismiss, title})"
      class="button is-warning"
    >
      Warning
    </button>
  </section>

  <section class="hspaced">
    <input class="input" type="text" placeholder="Title" v-model="title" />
    <input
      class="input"
      type="text"
      placeholder="Message to toast"
      v-model="message"
    />
    <input
      class="input"
      type="text"
      type="number"
      placeholder="Dismiss after (ms)"
      v-model="dismiss"
    />
  </section>

  <p>
    <strong>Note:</strong> if <code>options.dismiss</code> is set to a falsy value, then the toast won't auto-dismiss. Otherwise, if the provided value is a valid number, that number (in ms) will be used to auto-dismiss. If the value is not a valid number, the default value <code>1500</code> is used.
  </p>

  <section class="sections">
    <p>Function call:</p>
      <pre>toast("{{ message }}", options). where toast: success|failure|info|warning</pre>
    <p>Options:</p>
    <pre>{{ options }}</pre>
  </section>

  <section class="sections">
    <button v-on:click="toaster.clear().then(r => console.log(r))" class="button is-outlined">Clear Toaster</button>
    <pre>toaster.clear()</pre>
  </section>
</div>
`;

export default template;
