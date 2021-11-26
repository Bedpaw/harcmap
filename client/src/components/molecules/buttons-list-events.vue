<template>
  <section v-if="buttonsDetails.length > 0" class="f-text-left" >
    <span>{{title}}</span>
    <component
      v-bind="{
        addAreaClass: 'f-small-area',
        addClass: button.secondLineText ? 'f-two-lines' : '',
      }"
      v-for="button in buttonsDetailsPaginated" :key="button.id"
      :is="buttonTypeComponent"
      @click="button.onClick(button.id ? button.id : null)"
    >
      <a-icon
        v-if="button.iconLeftProps"
        v-bind="button.iconLeftProps"
        class="a-icon f-left"
      />
      <span>{{ button.text }}</span>
      <span v-if="button.secondLineText" class="f-text-gray f-mt-half">
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
import { DEFAULT_EVENT_CONFIG } from 'config/event-config';

export default {
  name: 'm-buttons-list-events',
  components: {
    AButtonFillSecondary,
    AButtonFillPrimary,
    AButton,
  },
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
      default: DEFAULT_EVENT_CONFIG.paginationStepOnEventList,
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
    buttonsDetailsPaginated () {
      return this.buttonsDetails.slice(0, this.buttonsLimit);
    },
    buttonTypeComponent () {
      return this.primary ? AButtonFillPrimary.name : AButtonFillSecondary.name;
    },
  },
};
</script>
