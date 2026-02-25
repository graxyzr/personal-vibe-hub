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

    // Carregar notas do localStorage
    useEffect(() => {
        const saved = localStorage.getItem('quick-notes')
        if (saved) {
            setNotes(JSON.parse(saved))
        }
    }, [])

    // Salvar notas no localStorage
    useEffect(() => {
        localStorage.setItem('quick-notes', JSON.stringify(notes))
    }, [notes])

    const handleSaveNote = () => {
        if (!currentNote.trim()) return

        const newNote: Note = {
            id: Date.now().toString(),
            content: currentNote.trim(),
            createdAt: Date.now()
        }

        setNotes([newNote, ...notes])
        setCurrentNote('')
    }

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id))
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <GlassCard ariaLabel="Notas rápidas" title="Notas Rápidas" className="md:col-span-2">
            <div className="space-y-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        placeholder="Digite sua nota..."
                        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveNote()}
                    />
                    <button
                        onClick={handleSaveNote}
                        disabled={!currentNote.trim()}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notes.length === 0 ? (
                        <p className="text-center text-white/40 py-4">
                            Nenhuma nota ainda
                        </p>
                    ) : (
                        notes.map((note) => (
                            <div
                                key={note.id}
                                className="flex items-start justify-between p-3 bg-white/5 rounded-lg group"
                            >
                                <div className="flex-1">
                                    <p className="text-white/80">{note.content}</p>
                                    <span className="text-xs text-white/40">
                                        {formatDate(note.createdAt)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                                >
                                    <Trash2 className="w-4 h-4 text-white/60" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </GlassCard>
    )
}