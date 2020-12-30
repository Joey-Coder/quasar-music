<template>
  <div class="list-detail">
    <q-page class="q-py-lg row justify-center">
      <div class="card-wrapper col-10">
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img class="col-5" src="../../public/zzf.jpeg" />

            <q-card-section>
              {{ lorem }}
            </q-card-section>
            <q-card-actions align="">
              <q-btn flat round color="red" icon="favorite" />
              <q-btn flat round color="teal" icon="bookmark" />
              <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
// import { getListDetail } from '../boot/axios'
export default {
  name: 'ListDetail',
  data() {
    return {
      lorem: 'sdfdsf'
    }
  },
  methods: {},
  components: {},
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watched: {}
}
</script>
<style scoped lang="scss"></style>
