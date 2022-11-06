<template>
  <t-page class="f-flex f-flex-col">
    <div>
      <m-field-text
        v-model="phrase"
        :label="$t('general.search')"
        :assist="searchAssist"
      />
    </div>
    <div class="a-assist">
      {{ $t('features.searcher.markersResultLength') }} {{ filteredElements.length }}
    </div>
    <slot
      name="result-list"
      :filteredElements="filteredElements"
    />
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
  data () {
    return {
      phrase: '',
      searcher: new JsSearch.Search(this.searchKeys[0]),
    };
  },
  computed: {
    filteredElements () {
      const searched = this.searcher.search(this.phrase);
      return this.phrase === '' ? this.elements : searched;
    },
  },
  watch: {
    elements () {
      this.defineSearcher();
    },
  },
  mounted () {
    this.defineSearcher();
  },
  methods: {
    defineSearcher () {
      this.searchKeys.map(key => this.searcher.addIndex(key));
      this.searcher.addDocuments(this.elements);
    },
  },
};
</script>
