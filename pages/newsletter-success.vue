<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

// Set page title and meta description
useSeoMeta({
  title: 'Newsletter-Anmeldung bestätigt - Eileen George',
  description: 'Vielen Dank für die Bestätigung deiner Newsletter-Anmeldung. Du erhältst ab sofort wertvolle Inhalte rund um psychologisches Coaching.',
});
</script>

<template>
  <div class="flex items-center justify-center py-20">
    <div class="max-container">
      <div class="max-w-2xl mx-auto text-center">

        <!-- Success Icon -->
        <div class="mb-8">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-lightGold via-gold to-darkGold rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <!-- Main Heading -->
        <h1 class="font-heading text-3xl sm:text-3xl lg:text-4xl text-coffee mb-6">
          Newsletter-Anmeldung bestätigt!
        </h1>

        <!-- Success Message -->
        <p class="text-lg text-coffee/80 mb-8 leading-relaxed">
          Vielen Dank! Deine E-Mail-Adresse wurde erfolgreich zu unserem Newsletter hinzugefügt.
        </p>

        <!-- Additional Info -->
        <div class="bg-offwhite rounded-lg p-6 mb-8">
          <p class="text-coffee/70 text-sm leading-relaxed">
            Falls du Fragen hast oder Hilfe benötigst, zögere nicht, mich zu kontaktieren.
            Ich freue mich darauf, dich auf deiner Reise zu begleiten.
          </p>
        </div>

        <!-- Call to Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center bg-salmon text-white px-6 py-1 rounded-full hover:bg-salmon/90 transition-colors font-medium"
          >
            Zur Startseite
          </NuxtLink>

          <NuxtLink
            to="/download"
            class="inline-flex items-center justify-center border-2 border-coffee/20 text-coffee px-6 py-1 rounded-full hover:border-coffee/40 hover:bg-coffee/5 transition-all font-medium"
          >
            Downloads entdecken
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>