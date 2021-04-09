<template>
  <div class="donate-button">
    <template v-if="showLink === true">
      <a
        href="https://www.paypal.com/donate?hosted_button_id=GUU8QVSRZFSCQ"
        target="_blank"
        >Donate</a
      >
    </template>
    <template v-else>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="GUU8QVSRZFSCQ" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_BE/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </template>
  </div>
</template>

<script>
export default {
  name: "DonationButton",
  props: {
    showLink: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
