<script setup lang="ts">
  const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getOffsetToMondayInMonth = (year: number, month: number) => {
    const currentDayIndex = new Date(year, month, 1).getDay();
    const mondayIndex = 1;
    const offset = (currentDayIndex + 7 - mondayIndex) % 7;
    return offset;
  };
  const getWeekday = (year: number, month: number, day: number) => {
    return new Date(year, month, day).getDay();
  };
  const increaseMonth = () => {
    if (state.month < state.maxMonth) {
      if (state.month < 11) state.month++;
      else {
        state.month = 0;
        state.year++;
      }
    }
  };
  const decreaseMonth = () => {
    if (state.month > state.minMonth) {
      if (state.month > 0) state.month--;
      else {
        state.month = 11;
        state.year--;
      }
    }
  };

  const isWeekend = (dayIndex: number) => {
    if (dayIndex === 6 || dayIndex === 0) return true;
    return false;
  };
  const isInThePast = (year: number, month: number, day: number) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const truncatedDate = new Date(year, month, day).setHours(0, 0, 0, 0);
    if (truncatedDate < currentDate) return true;
    return false;
  };

  const daysInCurrentMonth = computed(() => {
    const numberOfDays = getDaysInMonth(state.year, state.month);
    const daysInMonth = Array.from(Array(numberOfDays).keys()).map((el) => el + 1);
    return daysInMonth.map((day) => {
      const weekday = getWeekday(state.year, state.month, day);
      return {
        date: day,
        weekday: weekday,
        isDisabled: isWeekend(weekday) || isInThePast(state.year, state.month, day),
      };
    });
  });
  const offsetToMonday = computed(() => getOffsetToMondayInMonth(state.year, state.month));
  const daysInLastMonth = computed(() => {
    let month = state.month;
    let year = state.year;
    if (month > 0) {
      month--;
    } else {
      month = 11;
      year--;
    }
    const days = Array.from(Array(getDaysInMonth(year, month)).keys()).map((el) => el + 1);
    if (offsetToMonday.value === 0) {
      return [];
    } else {
      const amount = -1 * offsetToMonday.value;
      return days.slice(amount);
    }
  });

  const state = reactive({
    step: 1,
    minMonth: new Date().getMonth(),
    maxMonth: (new Date().getMonth() + 3) % 12,
    today: new Date(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    selectedDate: new Date().setHours(0, 0, 0, 0),
    timeslots: ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00"],
  });

  const selectDate = (day) => {
    state.selectedDate = new Date(state.year, state.month, day).setHours(0, 0, 0, 0);
  };
</script>

<template>
  <div class="max-container">
    <div class="py-20">Buchen Sie Ihren Termin</div>
    <div class="flex flex-col lg:flex-row gap-10">
      <div class="w-1/2 border border-yellow pb-20">
        <div class="flex items-center justify-between mb-2">
          <div style="width: 14.285%" class="flex items-center justify-center">
            <button
              v-if="state.month > state.minMonth"
              @click.stop="decreaseMonth"
              class="aspect-square w-full hover:bg-gold rounded-full m-3 flex items-center justify-center"
            >
              <nuxt-icon name="icon-caret-left" class="text-xl" />
            </button>
          </div>
          <div>
            {{ new Date(state.year, state.month).toLocaleString("de-DE", { month: "long" }) }}
          </div>
          <div style="width: 14.285%" class="flex items-center justify-center">
            <button v-if="state.month < state.maxMonth"
              @click.stop="increaseMonth"
              class="aspect-square w-full hover:bg-gold rounded-full m-3 flex items-center justify-center"
            >
              <nuxt-icon name="icon-caret-right" class="text-xl" />
            </button>
          </div>
        </div>

        <div class="weekdays flex justify-start mb-2">
          <div
            v-for="(weekday, index) in weekdays"
            :key="'weekday' + index"
            style="width: 14.285%"
            class="flex items-center justify-center text-lightGrey text-opacity-60"
          >
            {{ weekday }}
          </div>
        </div>
        <div class="flex flex-wrap justify-start">
          <div
            v-for="(dayInLastMonth, index) in daysInLastMonth"
            :key="'offset' + index"
            style="width: 14.285%"
            class="offsets text-lightGrey text-opacity-60 flex items-center justify-center flex-shrink-0"
          >
            <div class="w-full aspect-square flex items-center justify-center">
              {{ dayInLastMonth }}
            </div>
          </div>
          <div
            v-for="(day, index) in daysInCurrentMonth"
            :key="'day' + index"
            style="width: 14.285%"
            :class="[day.isDisabled ? 'text-lightGrey text-opacity-60' : '']"
            class="flex items-center justify-center flex-shrink-0 p-1"
          >
            <button
              v-if="!day.isDisabled"
              @click.stop="selectDate(day.date)"
              class="hover:border hover:border-gold rounded-full w-full aspect-square"
              :class="[
                state.selectedDate ===
                new Date(state.year, state.month, day.date).setHours(0, 0, 0, 0)
                  ? 'bg-gold'
                  : '',
              ]"
            >
              {{ day.date }}
            </button>
            <div v-else class="w-full aspect-square flex items-center justify-center">
              {{ day.date }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="mb-6">
          Am {{ new Date(state.selectedDate).toLocaleDateString("de-DE", {}) }} stehen Ihnen
          folgende Termine zur Verfügung:
        </div>

        <div class="flex items-center flex-wrap gap-2">
          <div
            v-for="(timeslot, index) in state.timeslots"
            :key="'timeslot' + index"
            class="bg-gold rounded px-1"
          >
            {{ timeslot }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
