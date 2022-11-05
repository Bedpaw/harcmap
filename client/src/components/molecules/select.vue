<template>
  <div class="m-input f-relative">
    <div
      class="a-field f-select"
      :class="additionalClasses"
      @click="makeFocus($event)"
    >
      <input
        :id="id"
        ref="inputElement"
        class="a-input f-select"
        :class="additionalClasses"
        :value="label"
        readonly
        @click="focusIn"
        @focusin="focusIn"
        @focusout="focusOut"
        @keyup.esc.prevent="closeOptions"
        @keyup.enter.space.prevent="chooseAndToggleOptions"
        @keyup.up.prevent="optionUp"
        @keyup.down.prevent="optionDown"
      >
    </div>
    <label
      class="a-label f-field"
      :for="id"
      :class="{ 'f-correct': correct, 'f-error': error }"
    >
      {{ placeholder }}
    </label>
    <a-icon
      :name="$icons.names.arrow_drop_down"
      class="f-input"
      @click.stop="makeFocus($event)"
    />
    <div
      v-if="optionsAreOpen"
      ref="optionsElement"
      class="m-options"
      :class="{ 'f-top': optionsAreOutsideWindow }"
    >
      <div
        v-for="(option, index) of options"
        :key="option.value"
        class="a-option"
        :class="{ 'f-selected': option.value === vModel, 'f-pointed': pointedOption === index }"
        :style="option.style"
        @click="chooseOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
    <div
      class="a-assist"
      :class="{ 'f-error': error, 'f-disabled': disabled}"
    >
      {{ assist }}
    </div>
  </div>
</template>

<!-- USAGE EXAMPLE
  <m-select
    :options="[{label: '5 min', value: 5 * 60}]"
    :placeholder="$t('form.field.mapRefreshTime')"
    v-model="values.mapRefreshTime"
  />
-->

<script>
import { logical } from 'vendors/logical';
import { modelValueMixin, useModelValue } from 'plugins/v-model';
import { computed, nextTick, onMounted, ref, toRefs } from 'vue';
import { fieldUidGenerator } from 'plugins/uid-generators';

export default {
  name: 'm-select',
  mixins: [modelValueMixin],
  props: {
    /**
     * options: [{label: String, value: String}]
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    correct: {
      type: Boolean,
      default: false,
    },
    assist: {
      type: String,
      default: '',
    },
  },
  emits: ['change'],
  setup (props, context) {
    const { vModel } = useModelValue(props, context);
    const { options, error, correct, disabled } = toRefs(props);

    const id = ref('');
    const optionsAreOpen = ref(false);
    const optionsAreOutsideWindow = ref(false);
    const pointedOption = ref(-1);

    const label = computed(() => {
      const option = options.value.find(option => option.value === vModel.value);
      return option ? option.label : '';
    });
    const additionalClasses = computed(() => ({
      'f-filled': label.value !== '',
      'f-error': error.value,
      'f-correct': correct.value,
      'f-disabled': disabled.value,
    }));

    function resetPointedOption (value = vModel.value) {
      if (logical.isNull(value))
        pointedOption.value = -1;
      else
        pointedOption.value = options.value.findIndex(option => option.value === value);

    }

    const optionsElement = ref(null);

    function toggleOptions (newState) {
      if (disabled.value) return;

      const oppositeState = optionsAreOpen.value === false;
      optionsAreOpen.value = newState !== undefined ? newState : oppositeState;
      resetPointedOption();

      if (optionsAreOpen.value) {
        nextTick(() => {
          const options = optionsElement.value;
          const optionsProps = options.getBoundingClientRect();
          const optionsHeight = optionsProps.height;
          const optionsTop = optionsProps.top;
          const windowHeight = window.outerHeight;
          optionsAreOutsideWindow.value = optionsHeight + optionsTop + 8 >= windowHeight;
        });
      } else
        optionsAreOutsideWindow.value = false;

    }

    const timeoutId = ref(null);

    function focusIn () {
      clearTimeout(timeoutId.value);
      timeoutId.value = setTimeout(() => toggleOptions(true), 100);
    }

    function focusOut () {
      clearTimeout(timeoutId.value);
      timeoutId.value = setTimeout(() => toggleOptions(false), 100);
    }

    const inputElement = ref(null);

    function makeFocus (event) {
      event.preventDefault();
      inputElement.value.focus();
    }

    function closeOptions (config = { resetPointedOption: true }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          optionsAreOpen.value = false;
          if (config.resetPointedOption)
            resetPointedOption();

          resolve();
        });
      });
    }

    function chooseOption ({ value, index }) {
      if (disabled.value) return;

      if (typeof index !== 'undefined')
        value = options.value[index].value;

      closeOptions({ resetPointedOption: false })
        .then(() => {
          context.emit('change', value);
          vModel.value = value;
          resetPointedOption(value);
        });
    }

    function chooseAndToggleOptions () {
      const index = pointedOption.value;
      if (optionsAreOpen.value && index >= 0)
        chooseOption({ index });
      else
        toggleOptions();

    }

    const optionSwitch = index => optionsAreOpen.value === false && chooseOption({ index });

    function optionUp () {
      if (pointedOption.value - 1 < 0)
        pointedOption.value = options.value.length - 1;
      else
        pointedOption.value -= 1;

      optionSwitch(pointedOption.value);
    }

    function optionDown () {
      if (disabled.value) return;

      if (pointedOption.value + 1 > options.value.length - 1)
        pointedOption.value = 0;
      else
        pointedOption.value += 1;

      optionSwitch(pointedOption.value);
    }

    onMounted(() => {
      id.value = fieldUidGenerator.getNext();
      resetPointedOption();
    });

    return {
      vModel,
      optionsElement,
      id,
      optionsAreOpen,
      optionsAreOutsideWindow,
      pointedOption,
      label,
      additionalClasses,
      focusIn,
      focusOut,
      inputElement,
      makeFocus,
      closeOptions,
      chooseOption,
      chooseAndToggleOptions,
      optionUp,
      optionDown,
    };
  },
};
</script>
