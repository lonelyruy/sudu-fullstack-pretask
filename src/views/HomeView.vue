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

      <!-- Show Note -->
      <div v-if = "filteredNotes.length > 0" class = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        <!-- Note Card -->
        <div
          v-for = "note in filteredNotes"
          :key = "note.id"
          class = "bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >

          <div>
            <h3 class = "font-bold text-lg text-slate-800 mb-2 line-clamp-1">{{ note.title }}</h3>
            <p class="text-slate-600 text-sm line-clamp-4 whitespace-pre-line leading-relaxed">{{ note.content }}</p>
          </div>

          <!-- Card Actions -->
          <div class="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs text-slate-400">
            <span> Last Update at {{note.updatedAt}} </span>
            <div class="flex items-center gap-1">
              <button @click="openEditModal(note)"> Edit </button>
              <button @click="downloadTxt(note)"> Download </button>
              <button @click="deleteNote(note.id)"> Delete </button>
            </div> 
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
        <div class="text-4xl mb-3">📝</div>
        <h3 class="text-lg font-bold text-slate-700">No notes found</h3>
        <p v-if="searchQuery" class="text-slate-500 text-sm mt-1">Try searching for a different keyword.</p>
        <p v-else class="text-slate-500 text-sm mt-1">Click <strong>"+ New Note"</strong> above to create your first note!</p>
      </div>
    </div>

    <!-- Modal Popup -->
    <div  
      v-if = "isModalOpen"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50"
      @click.self = "closeModal"
    >

      <!-- For choosing editing or create-->
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 class="text-xl font-bold text-slate-800">
            {{ editingNoteId ? 'Edit Note' : '+ Create New Note'}}
          </h2>
          <button @click = "closeModal" class="text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
        </div>

        <!-- File Title -->
        <form @submit.prevent = "saveNote" class = "space-y-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Title</label>
            <input 
              v-model = "form.title"
              type = "text"
              placeholder = "e.g. To Do list"
              required
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"
            />
          </div>

          <!-- File Content -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1">Content</label>
            <textarea
              v-model = "form.content"
              rows = "5"
              placeholder = "Write your detaild here..."
              required
              class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm"          
            ></textarea>
          </div>

          <!-- Close Button & Submit Button-->
          <div class = "flex justify-end gap-2 pt-2">
            <button
              type = "button"
              @click = "closeModal"
              class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button 
              type = "submit"
              class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {{ editingNoteId ? 'Update' : 'Save Note' }}

            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

//State
const searchQuery = ref('')
const isModalOpen = ref(false)
const editingNoteId = ref(null)

const form = ref({
  title: '',
  content:''
})

//Default starter notes
const defualtNotes = [
  {
    id: 1,
    title: 'Welcome Note',
    content: 'First Note',
    updatedAt: new Date().toLocaleDateString()
  }
]

// LocalStorage Persistence(Connect database)
const notes = ref(JSON.parse(localStorage.getItem('vue_notes')) || defualtNotes)

watch(notes, (newNotes) => {
  localStorage.setItem('vue_notes', JSON.stringify(newNotes))
}, {deep: true})

//Search Filter Logic
const filteredNotes = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if(!query) return notes.value

  return notes.value.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  )
})

// Modal Handlers
const openCreateModal = () => {
  editingNoteId.value = null
  form.value = {title: '', content: ''}
  isModalOpen.value = true
}

const openEditModal = (note) =>{
  editingNoteId.value = note.id
  form.value = { title: note.title, content: note.content }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Create
const saveNote = () => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  if(editingNoteId.value){
    const index = notes.value.findIndex(n => n.id === editingNoteId.value)
    if(index !== -1) {
      notes.value[index] = {
        ...notes.value[index],
        title: form.value.title,
        content: form.value.content,
        updatedAt: formattedDate
      }
    }
  } else {
    notes.value.unshift({
     id: Date.now(),
     title: form.value.title,
     content: form.value.content,
     updatedAt: formattedDate
    })
  }

  closeModal()
}

//Delete Note
const deleteNote = (id) => {
  if (confirm('Are your sure you want to delete this note?')) {
    notes.value = notes.value.filter(note => note.id !== id)
  }
}

//Download as .txt
const downloadTxt = (note) => {
  const blob = new Blob([`${note.title}\n\n${note.content}`], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${note.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`
  link.click()
  URL.revokeObjectURL(url)
}



</script>