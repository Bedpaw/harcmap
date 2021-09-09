<template>
  <section v-if="buttonsDetails.length > 0" class="f-text-left" >
    <span>{{title}}</span>
    <component  v-for="button in buttonsDetails.slice(0, buttonsLimit)" :key="button.id"
                :is="primary ? 'a-button-fill-primary' : 'a-button-fill-secondary'"
                v-bind="button.props"
                @click="button.onClick(button.id ? button.id : null)"
    >
      <a-icon
        v-if="button.iconLeftProps"
        v-bind="button.iconLeftProps"
        class="a-icon f-left"
      />
      <span v-if="button.secondLineText" :class="button.secondLineTextAddClass">
        {{button.secondLineText}}
      </span>
      <a-icon
        v-if="button.iconRightProps"
        v-bind="button.iconRightProps"
        class="a-icon f-right"
      />
    </component>
    <a-button
      v-if="buttonsDetails.length > buttonsLimit"
      @click="numberOfTimesButtonsLimitIncreased++;"
      add-class="f-clear"
      add-area-class="f-mt--1 f-relative-center">
      {{$t('general.showMore2')}}
    </a-button>
  </section>
</template>

<script>
import AButtonFillPrimary from 'atoms/button/fill/primary';
import AButtonFillSecondary from 'atoms/button/fill/secondary';
import AButton from 'atoms/button';
export default {
  name: 'm-buttons-list',
  components: { AButtonFillSecondary, AButtonFillPrimary, AButton },
  data: () => ({
    numberOfTimesButtonsLimitIncreased: 1,
  }),
  props: {
    buttonsDetails: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
    },
    buttonLimitStep: {
      type: Number,
      default: 3,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonsLimit () {
      return this.buttonLimitStep * this.numberOfTimesButtonsLimitIncreased;
    },
  },
};
</script>
