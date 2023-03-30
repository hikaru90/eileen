<script setup lang="ts">
  const state = reactive({
    imprintVisible: false,
  });
</script>

<template>
  <div>
    <div class="w-full border-b border-sand border-opacity-20"></div>

    <div class="outer-container">
      <div class="py-6">
        <button @click="state.imprintVisible = true">Impressum</button>
      </div>
    </div>

    <div
      v-if="state.imprintVisible"
      class="fixed w-full h-full top-0 left-0 bg-white bg-opacity-80 flex items-center justify-center z-20"
      @click.self="state.imprintVisible = !state.imprintVisible"
    >
      <div class="max-container">
        <div class="w-full h-full bg-black text-lightGrey -ml-2 p-10">

          <div class="flex items-center justify-between mb-20">
            <h2 class="text-4xl">
              Impressum
            </h2>

            <button class="p-4" @click="state.imprintVisible = false">
              ❌
            </button>
          </div>

          <p>
            Impressum gemäß § 5 TMG<br /><br />
            Dimple Goertz<br />
            Paartherapeutin und systemischer Coach<br />
            Kronenstraße 45<br />
            70174 Stuttgart <br /><br />
            E-Mail: goertz@paartherapieundcoaching.de<br />
            Umsatzsteuer-ID: Aufgrund des Kleinunternehmerstatus wird gemäß §19 UStg die MwSt. in der Rechnung nicht
            ausgewiesen.<br />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
