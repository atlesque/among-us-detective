<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1366 768"
    class="max-w-full"
  >
    <defs>
      <filter
        id="A"
        x="772.3"
        y="432.461"
        width="54.401"
        height="57.079"
        filterUnits="userSpaceOnUse"
      >
        <feOffset />
        <feGaussianBlur stdDeviation="2" result="A" />
        <feFlood />
        <feComposite operator="in" in2="A" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="B"
        x="970.352"
        y="433.406"
        width="55.296"
        height="56.189"
        filterUnits="userSpaceOnUse"
      >
        <feOffset />
        <feGaussianBlur stdDeviation="2" result="A" />
        <feFlood />
        <feComposite operator="in" in2="A" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter
        id="C"
        x="859.5"
        y="244.5"
        width="74"
        height="18"
        filterUnits="userSpaceOnUse"
      >
        <feOffset />
        <feGaussianBlur stdDeviation="2" result="A" />
        <feFlood />
        <feComposite operator="in" in2="A" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g transform="translate(-277 -156)">
      <path fill="rgba(255,255,255,0.5)" d="M277 156h1366v768H277z" />
      <g transform="translate(277 156)" filter="url(#A)" class="C">
        <path
          transform="translate(780.5 440.5)"
          fill="none"
          stroke="red"
          d="M0 0l38 41"
        />
      </g>
      <g transform="translate(277 156)" filter="url(#B)" class="C">
        <path
          transform="translate(978.5 441.5)"
          fill="none"
          stroke="red"
          d="M39 0L0 40"
        />
      </g>
      <g transform="translate(277 156)" filter="url(#C)" class="C">
        <path
          transform="translate(865.5 253.5)"
          fill="none"
          stroke="red"
          d="M0 0h62"
        />
      </g>
      <path
        d="M1052.5 189.5h242v215h-242z"
        fill="none"
        stroke-width="5"
        class="B"
      />
      <text fill="red" font-size="45" class="B D E">
        <tspan x="1157" y="457" class="F">N</tspan>
        <tspan x="1064" y="601" class="F">SW</tspan>
        <tspan x="1218" y="601" class="F">SE</tspan>
      </text>
      <g fill="none" stroke-width="5" class="B">
        <path d="M1175.5 655.5h269v241h-269zm-14 0h-216" />
        <path d="M1159.5 653.5v215.868" />
        <path d="M476.5 867.368h685M476.5 401.5v467.868" />
        <path d="M947.5 569.5v87.868" />
        <path d="M945.5 571.5h96m-2-170v170" />
        <path d="M1041.5 403.5h-567" />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "MiraHqOverlay",
};
</script>

<style scoped>
.B {
  stroke: #000;
}
.C {
  stroke-width: 6;
}
.D {
  font-family: Inter-ExtraBold, Inter;
}
.E {
  font-weight: 800;
}
.F {
  stroke-width: 2;
}
</style>
