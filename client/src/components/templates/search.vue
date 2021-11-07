<template>
  <t-page class="f-flex f-flex-col">
    <div>
      <m-field-text
        :label="$t('general.search')"
        :assist="searchAssist"
        v-model="phrase"
      />
    </div>
    <slot name="result-list" :filteredElements="filteredElements"></slot>
  </t-page>

</template>

<script>
import TPage from 'templates/page';
import MFieldText from 'molecules/field/text';
import * as JsSearch from 'js-search';

export default {
  name: 't-search',
  components: {
    TPage,
    MFieldText,
  },
  data () {
    return {
      phrase: '',
      searcher: new JsSearch.Search(this.searchKeys[0]),
    };
  },
  props: {
    elements: {
      type: Array,
      required: true,
    },
    searchKeys: {
      type: Array,
      required: true,
    },
    searchAssist: {
      type: String,
      default: '',
    },
  },
  mounted () {
    this.defineSearcher();
  },
  computed: {
    filteredElements () {
      const searched = this.searcher.search(this.phrase);
      return this.phrase === '' ? this.elements : searched;
    },
  },
  methods: {
    defineSearcher () {
      this.searchKeys.map(key => this.searcher.addIndex(key));
      this.searcher.addDocuments(this.elements);
    },
  },
  watch: {
    elements () {
      this.defineSearcher();
    },
  },
};
</script>
