<template>
  <div class="m-input">
    <m-resize-auto>
      <template v-slot="{resize}">
        <textarea
          :id="id"
          class="a-field f-textarea"
          :class="additionalClasses"
          @input="resize"
          v-model="vModel"
        />
      </template>
    </m-resize-auto>
    <label
      class="a-label f-field"
      :class="{ 'f-correct': correct, 'f-error': error }"
      :for="id"
    >
      {{ placeholder }}
    </label>
    <a-icon
      :name="$icons.names.warning"
      v-if="error"
      class="f-input f-error"
    />
    <a-icon
      :name="$icons.names.check"
      v-if="correct && error === false"
      class="f-input f-correct"
    />
    <div
      class="a-assist"
      :class="{ 'f-error': error }"
    >
      {{ assist }}
    </div>
  </div>
</template>

<script>
import MResizeAuto from 'molecules/resize-auto';
import { computed, onMounted, ref, toRefs } from 'vue';
import { modelValueMixin, useModelValue } from 'plugins/v-model';
import { fieldUidGenerator } from 'plugins/uid-generators';

export default {
  name: 'm-textarea',
  components: {
    MResizeAuto,
  },
  props: {
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
  mixins: [modelValueMixin],
  setup: (props, context) => {
    const { vModel } = useModelValue(props, context);
    const { error, correct } = toRefs(props);

    const id = ref('');

    onMounted(() => (id.value = fieldUidGenerator.getNext()));

    const additionalClasses = computed(() => ({
      'f-filled': vModel.value !== '',
      'f-error': error.value,
      'f-correct': correct.value,
      'f-icon': error.value,
    }));

    return {
      vModel,
      id,
      additionalClasses,
    };
  },
};
</script>
