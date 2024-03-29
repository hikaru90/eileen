<template>
  <div>
    <div class="mb-16 bg-sand text-darkOffwhite">
      <div class="max-container">
        <div class="flex items-center justify-start py-8">
          <div class="leading-5 mt-1 font-heading lg:text-3xl">
            Diese Seite befindet sich im Aufbau
          </div>
        </div>
      </div>
    </div>

    <div class="max-container">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-start mb-20">
        <nuxt-img format="webp" src="/eileen_george.jpg" alt="Eileen George" style="max-width: 260px" class="w-full mr-10 rounded-md" />
        <h1 class="mt-6">
          <span class="font-heading text-xl lg:text-4xl">Eileen George<br /> </span>
          <span class="text-2xl"> Paartherapeutin und systemischer Coach </span>
        </h1>
      </div>
    </div>

    <PlaceholderSeparator number="01" text="Angebot" />

    <div class="max-container">
      <div class="flex flex-col md:flex-row gap-20 my-20">
        <aside>
          <div class="flex">
            <div class="w-4 h-4 bg-red transform rotate-45"></div>
            <div class="w-4 h-4 bg-sand transform rotate-45"></div>
          </div>
          <h2 class="font-heading text-xl lg:text-4xl my-6">Für Paare</h2>
          <p class="leading-7 text-gray-600">
            Ihr verliert euch in Streitigkeiten, körperliche Zuneigung findet kaum mehr statt oder
            fühlt euch als Paar nicht mehr verbunden? Als systemische Paartherapeutin und Coach
            unterstütze Ich euch in diesen und weiteren Themen um die für euch als Paar optimale
            Lösung zu finden.
          </p>
        </aside>
        <aside>
          <div class="flex">
            <div class="w-4 h-4 bg-emerald-900 transform rotate-45"></div>
          </div>
          <h2 class="font-heading text-xl lg:text-4xl my-6">Für Einzelpersonen</h2>
          <p class="leading-7 text-gray-600">
            Du befindest dich aktuell in einer Beziehung und möchtest eine Veränderung oder bist
            Single und wünschst dir eine Beziehung? Ich begleite dich dabei, in eine glückliche und
            erfüllte Beziehung zu kommen, mehr Klarheit darüber zu erhalten was du wirklich möchtest
            und gute Entscheidungen für dich und deine Partnerschaft zu treffen.
          </p>
        </aside>
      </div>
    </div>

    <PlaceholderSeparator number="02" text="Über mich" />

    <div class="max-container">
      <div class="flex flex-col gap-2 my-20">
        <!-- <div class="text-gray-600">Werdegang</div> -->
        <p class="text-xl lg:text-4xl leading-relaxed font-heading">
          Systemische Paartherapeutin<br />
          Systemischer Coach <sup class="lg:text-xl">(DBVC)</sup><br />
          <!-- Weiterbildung in Systemischer Beratung & Therapie<br /> -->
          Personalentwicklerin<br />
          Erwachsenenpädagogin<br />
        </p>
      </div>
    </div>

    <PlaceholderSeparator number="03" text="Kontakt" />

    <div class="max-container">
      <div class="flex flex-col gap-2 my-20">
        <p class="text-xl lg:text-4xl leading-relaxed font-heading">
          Eileen George<br />
          <a href="tel:+49 (0) 1573 1664595" class="underline">+49 (0) 1573 1664595</a><br />
          <a href="mailto:kontakt@eileengeorge.de" class="underline"
            >kontakt@eileengeorge.de</a
          ><br />
        </p>
      </div>
    </div>

    <PlaceholderFooter />
  </div>
</template>
