import React, { useState, useEffect } from 'react'
import { ChevronDown, User, LogIn, Lock, Bot, Zap, Code, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const ChatDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Fix hydration mismatch by ensuring component only renders after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="h-8 px-3 py-2" /> // Placeholder with same height
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="px-3 py-2 text-sm font-medium hover:bg-accent"
                    style={{
                        borderRadius: '12px'
                    }}
                >
                    <div className="flex items-center gap-2">
                        {/* <Image src="/kortix-symbol.svg" alt="КЛИК" width={16} height={16} className="h-4 w-4 dark:invert" /> */}
                        <span>ИИ-агент по умолчанию</span>
                        <ChevronDown size={14} className="opacity-50" />
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64 p-0 border"
                sideOffset={4}
            >
                <DropdownMenuItem
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent border-b m-0"
                    style={{
                        borderRadius: '0'
                    }}
                >
                    <User size={18} />
                    <div className="flex flex-col">
                        <span className="font-semibold text-sm">Агент по умолчанию</span>
                        <span className="text-xs text-muted-foreground">По умолчанию</span>
                    </div>
                </DropdownMenuItem>

                <div className="relative">
                    {/* Dummy agents behind the overlay */}
                    <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent border-b m-0">
                        <Bot size={18} />
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Помощник по коду</span>
                            <span className="text-xs text-muted-foreground">Помощь с кодированием</span>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent border-b m-0">
                        <Zap size={18} />
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Быстрый писатель</span>
                            <span className="text-xs text-muted-foreground">Быстрое создание контента</span>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent m-0">
                        <FileText size={18} />
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Помощник по документам</span>
                            <span className="text-xs text-muted-foreground">Анализировать документы</span>
                        </div>
                    </DropdownMenuItem>

                    {/* Overlay like the upgrade component */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent flex items-end justify-center">
                        <div className="w-full p-3">
                            <div className="rounded-xl bg-gradient-to-br from-slate-50/80 to-slate-100/70 dark:from-slate-900/40 dark:to-slate-800/30 shadow-sm border border-slate-200/50 dark:border-slate-700/50 p-3">
                                <div className="flex items-center justify-center">
                                    <Lock className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
                                    <p className="text-sm font-medium">Войдите, чтобы исследовать всех агентов</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ChatDropdown