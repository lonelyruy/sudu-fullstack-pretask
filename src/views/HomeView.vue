<template>

<!-- Header -->
  <div class="min-h-screen bg-slate-50 text-slate-800 p-6 sm:p-10">
    <div class = "max-w-5xl mx-auto space-y-6">
      <header class = "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 class = "text-3xl font-bold  text-slate-800 tracking-tight"> Note Manager </h1>
          <p class = "text-slate-500 text-sm mt-1"> Origanize your toughts and tasks in one place </p>
        </div>

        <button
          @click = "openCreateModal"
          class = "bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span> + </span> New Note
        </button>
      </header>
    </div>
  </div>

</template>