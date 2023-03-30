<template>
  <div>
    <div class="mb-16 bg-gradient-to-r from-darkYellow to-yellow">
      <div class="outer-container">
        <div class="flex items-center py-4">
          <div class="leading-8 font-heading text-4xl">Hier entsteht<br />Großartiges</div>
          <div class="ml-10 leading-5 mt-1">
            Diese Seite<br />
            befindet sich <br />
            im Aufbau<br />
          </div>
        </div>
      </div>
    </div>

    <div class="max-container">
      <div class="flex flex-col items-center justify-center mb-20">
        <img src="/dimple_goertz.jpg" alt="Dimple Görtz" style="max-width: 600px" class="w-full" />
        <h1 class="mt-6 lg:ml-6">
          <span class="font-heading text-4xl"> Dimple Görtz<br /> </span>
          <span class="lg:ml-20 text-sm"> — Paartherapeutin und systemischer Coach </span>
        </h1>
      </div>
    </div>

    <PlaceholderSeparator number="01" text="Leistung" />

    <div class="max-container">
      <div class="flex flex-col md:flex-row gap-20 my-20">
        <aside>
          <div class="flex">
            <div class="w-4 h-4 bg-red transform rotate-45"></div>
            <div class="w-4 h-4 bg-sand transform rotate-45"></div>
          </div>
          <h2 class="font-heading text-4xl my-6">Für Paare</h2>
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
          <h2 class="font-heading text-4xl my-6">Für Einzelpersonen</h2>
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
        <div class="text-gray-600">Ich bin</div>
        <p class="text-4xl leading-relaxed">
          Systemische Paartherapeutin<br />
          Systemischer Coach <sup class="text-xl">(DBVC)</sup><br />
          Personalentwicklerin<br />
          Erwachsenenpädagogin<br />
        </p>
        <div class="text-gray-600 mt-16">Weiterbildung</div>
        <p class="text-4xl leading-relaxed">Systemische Beratung & Therapie<br /></p>
      </div>
    </div>

    <PlaceholderSeparator number="03" text="Kontakt" />

    <div class="max-container">
      <div class="flex flex-col gap-2 my-20">
        <p class="text-4xl leading-relaxed">
          Dimple Goertz<br />
          <a href="tel:+49 (0) 1573 1664595" class="underline">+49 (0) 1573 1664595</a><br />
          <a href="mailto:goertz@paartherapieundcoaching.de" class="underline"
            >goertz@paartherapieundcoaching.de</a
          ><br />
        </p>
      </div>
    </div>

    <PlaceholderFooter />
  </div>
</template>
