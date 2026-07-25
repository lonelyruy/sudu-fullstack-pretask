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

    <!-- Search Input -->
    <div class = "relative">
      <input 
        v-model = "searchQuery"
        type = "text"
        placeholder = "Search notes by title or content..."
        class = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-700 placeholder-slate-400"
      />
    </div>
  </div>
</div>

</template>