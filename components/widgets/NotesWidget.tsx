'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Save, Trash2 } from 'lucide-react'

interface Note {
    id: string
    content: string
    createdAt: number
}

export function NotesWidget() {
    const [notes, setNotes] = useState<Note[]>([])
    const [currentNote, setCurrentNote] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem('quick-notes')
        if (saved) setNotes(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem('quick-notes', JSON.stringify(notes))
    }, [notes])

    const handleSaveNote = () => {
        if (!currentNote.trim()) return
        const newNote: Note = { id: Date.now().toString(), content: currentNote.trim(), createdAt: Date.now() }
        setNotes([newNote, ...notes])
        setCurrentNote('')
    }

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id))
    }

    const formatDate = (ts: number) =>
        new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })

    return (
        <GlassCard ariaLabel="Notas rápidas" title="Notas Rápidas" className="sm:col-span-2 lg:col-span-2">
            <div className="space-y-3">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        placeholder="Digite sua nota..."
                        className="input-glass flex-1 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
                    />
                    <button
                        onClick={handleSaveNote}
                        disabled={!currentNote.trim()}
                        className="btn-glass btn-primary px-3 py-2"
                        aria-label="Salvar nota"
                    >
                        <Save className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {notes.length === 0 ? (
                        <p className="text-center text-white/30 py-6 text-sm">Nenhuma nota ainda</p>
                    ) : (
                        notes.map((note) => (
                            <div
                                key={note.id}
                                className="flex items-start justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] group hover:bg-white/[0.07] transition-colors duration-200"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-white/80 text-sm leading-snug">{note.content}</p>
                                    <span className="text-[11px] text-white/30 mt-0.5 block">{formatDate(note.createdAt)}</span>
                                </div>
                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1.5 hover:bg-white/10 rounded-lg btn-glass border-transparent"
                                    aria-label="Deletar nota"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-white/50" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </GlassCard>
    )
}