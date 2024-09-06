<template>
  <div>
    <h2 class="my-3">Directives</h2>
    <h3>Change color base directive</h3>
    <p v-color="'#f00'">This text is red</p>
    <p v-color="'green'">This text is green</p>
    <h3>Directive with Parameter</h3>
    <p v-action:text="'yellow'">This text is yellow</p>
    <p v-action:background="'blue'">This background is blue</p>
    <h3>Tooltip Directive</h3>
    <span v-tooltip="'This is a tooltip near the cursor'">Hover over this text</span>
    <h3>Drag and Drop Directive </h3>
    <div v-draggable class="draggable-box">You can move it</div>
  </div>
</template>

<script>
export default {
  name: 'DirectivesComponent',
  directives: {
    color: {
      mounted(el, binding) {
        el.style.color = binding.value;
      }
    },
    action: {
      mounted(el, binding) {
        const action = binding.arg;
        const value = binding.value;

        if (action === 'text') {
          el.style.color = value;
        } else if (action === 'background') {
          el.style.backgroundColor = value;
        }
      }
    },
    draggable: {
      mounted(el) {
        const onMouseMove = (event) => {
          el.style.left = `${event.pageX - el._startX}px`;
          el.style.top = `${event.pageY - el._startY}px`;
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseDown = (event) => {
          el._startX = event.pageX - el.offsetLeft;
          el._startY = event.pageY - el.offsetTop;

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        };

        el.addEventListener('mousedown', onMouseDown);

        el.destroy = () => {
          el.removeEventListener('mousedown', onMouseDown);
        };
      },
      unmounted(el) {
        el.destroy();
      },
    },
  },
};
</script>

<style scoped>
.draggable-box {
  position: absolute;
  width: 150px;
  height: 150px;
  text-align: center;
  background-color: #5353bc;
  cursor: grab;
}
</style>