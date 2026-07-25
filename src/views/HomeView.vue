<template>

<!-- Header -->
  <div class="min-h-screen bg-state-50 text-state-800 p-6 sm:p-10">
    <header class = "flex flex-col sm:flex-row sm:item-center sm:justify-between gap-4 pb4 border-b border-slate-200">
      <div>
        <h1 class = "text-3xl font-bold  text-slate-800 tracking-tight"> Note Manager </h1>
        <p> Origanize your toughts and tasks in one place, </p>
      </div>

      <button
        @click="openCreateModal"
      >
        <span> + </span> New Note
      </button>
    </header>
  </div>


</template>