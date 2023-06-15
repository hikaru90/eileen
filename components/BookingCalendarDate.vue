<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const { pb } = usePocketbase();
  const config = useRuntimeConfig();
  const emit = defineEmits(["selectTimeslot"]);

  const props = withDefaults(
    defineProps<{
      component?: object;
      selectedTimeslot?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "bookingCalendar").content,
      },
    }
  );

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
    appointmentsOfTheDay: [],
    timeslots: [],
  });

  const selectDate = async (day) => {
    state.selectedDate = new Date(state.year, state.month, day).setHours(0, 0, 0, 0);
    await getAppointsmentsOfTheDay();
    await calculateTimeslots();
  };

  const paddedMonth = computed(() => {
    return String(state.month + 1).padStart(2, "0");
  });
  const paddedDay = computed(() => {
    return String(new Date(state.selectedDate).getDate()).padStart(2, "0");
  });

  const getAppointsmentsOfTheDay = async () => {
    const filterValue = `start <= "${state.year}-${paddedMonth.value}-${paddedDay.value} 23:59:59" && end >= "${state.year}-${paddedMonth.value}-${paddedDay.value} 00:00:00"`;
    const resultList = await pb.collection("bookings").getFullList(200, {
      filter: filterValue,
    });
    state.appointmentsOfTheDay = resultList;
  };

  const getIntervalTimes = (startTime, endTime) => {
    let intervals = [];
    const start = new Date(`${state.year}-${paddedMonth.value}-${paddedDay.value} ` + startTime);
    const end = new Date(`${state.year}-${paddedMonth.value}-${paddedDay.value} ` + endTime);

    let currentTime = start;
    while (currentTime <= end) {
      console.log("currentTime.toLocaleTimeString()", currentTime.toLocaleTimeString());
      const timeString = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (state.appointmentsOfTheDay.length > 0) {
        let blockers = [];
        for (const appointment of state.appointmentsOfTheDay) {
          let appointmentStart = new Date(
            new Date(appointment.start).getTime() +
              new Date(appointment.start).getTimezoneOffset() * 60000
          );
          appointmentStart.setMinutes(appointmentStart.getMinutes() - 80);

          const appointmentEnd = new Date(
            new Date(appointment.end).getTime() +
              new Date(appointment.end).getTimezoneOffset() * 60000
          );

          console.log(
            "appointmentStart",
            appointmentStart.toLocaleTimeString(),
            " || appointmentEnd",
            appointmentEnd.toLocaleTimeString()
          );
          if (currentTime >= appointmentStart && currentTime < appointmentEnd) {
            blockers.push(1);
          } else {
            blockers.push(0);
          }
        }
        if (blockers.reduce((partialSum, a) => partialSum + a, 0) === 0) intervals.push(timeString);
      } else {
        intervals.push(timeString);
      }
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return intervals;
  };

  const calculateTimeslots = () => {
    const currentDaySettings = props.component.content.days.find(
      (day) => day.id === new Date(state.selectedDate).getDay()
    );
    state.timeslots = getIntervalTimes(currentDaySettings?.startTime, currentDaySettings?.endTime);
  };

  onMounted(async () => {
    await getAppointsmentsOfTheDay();
    await calculateTimeslots();
  });
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-10 mb-36">
    <div class="w-full lg:w-1/2">
      <div class="flex items-center justify-between mb-2">
        <div style="width: 14.285%" class="flex items-center justify-center">
          <button aria-label="Monat zurück"
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
          <button aria-label="Monat vor"
            v-if="state.month < state.maxMonth"
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
          <button aria-label="Tag auswählen"
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
    <div class="w-full lg:w-1/2">
      <h2 class="font-bold text-md mb-10 mt-6">Wählen Sie einen Termin aus</h2>
      <template v-if="state.timeslots.length === 0">
        Am
        <span class="font-bold">
          {{ new Date(state.selectedDate).toLocaleDateString("de-DE", {}) }}
        </span>
        stehen Ihnen leider keine freien Termine zur Verfügung.
      </template>
      <template v-else>
        <div class="mb-3">
          Am
          <span class="font-bold">
            {{ new Date(state.selectedDate).toLocaleDateString("de-DE", {}) }}
          </span>
          stehen Ihnen folgende Termine zur Verfügung:
        </div>

        <div class="flex items-center flex-wrap gap-2">
          <button aria-label="Zeitslot auswählen"
            @click="
              emit('selectTimeslot', {
                year: state.year,
                month: paddedMonth,
                day: paddedDay,
                timeslot: timeslot,
              })
            "
            v-for="(timeslot, index) in state.timeslots"
            :key="'timeslot' + index"
            :class="[
              props.selectedTimeslot?.month === paddedMonth &&
              props.selectedTimeslot?.day === paddedDay &&
              props.selectedTimeslot?.timeslot === timeslot
                ? 'bg-gold'
                : 'hover:bg-gold',
            ]"
            class="border border-gold rounded px-1 py-1 w-14 flex items-center justify-center"
          >
            {{ timeslot }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
