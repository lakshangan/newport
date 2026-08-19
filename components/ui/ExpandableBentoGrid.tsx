'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { X, ExternalLink, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BentoItem {
  id: string | number
  title: string
  subtitle?: string
  description?: string
  content: React.ReactNode
  icon?: React.ReactNode
  className?: string
  demoUrl?: string
  githubUrl?: string
  number?: string
  category?: string
}

export interface BentoGridProps {
  items: BentoItem[]
  className?: string
}

export default function ExpandableBentoGrid({ items, className }: BentoGridProps) {
  const [active, setActive] = useState<BentoItem | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null)
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md h-full w-full z-[10000]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 top-12 sm:top-16 grid place-items-center z-[10001] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 sm:top-6 sm:right-6 items-center justify-center bg-[#1e1e24] border border-white/20 hover:bg-[#C75B32] text-white rounded-full h-9 w-9 z-[10002] transition-colors shadow-lg"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5 text-white" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[620px] h-full md:h-fit md:max-h-[90vh] flex flex-col bg-[#111115] border border-white/15 sm:rounded-3xl overflow-hidden shadow-2xl text-[#E8E5DF]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <div className="w-full h-44 sm:h-56 bg-[#09090b] border-b border-white/10 flex items-center justify-center relative overflow-hidden group">
                  {active.icon ? (
                    <div className="w-full h-full flex items-center justify-center">
                      {active.icon}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#18181c]" />
                  )}
                  {active.number && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 border border-white/15 text-[#C75B32] font-mono text-xs font-bold rounded-full">
                      CASE STUDY // {active.number}
                    </div>
                  )}
                </div>
              </motion.div>

              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 border-b border-white/10 gap-4">
                  <div className="space-y-1">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-white"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.title}-${id}`}
                      className="text-xs sm:text-sm font-mono text-[#8E8B85]"
                    >
                      {active.description || active.subtitle}
                    </motion.p>
                  </div>

                  <div className="flex items-center gap-2">
                    {active.demoUrl && (
                      <motion.a
                        layoutId={`button-${active.title}-${id}`}
                        href={active.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-xl bg-[#C75B32] hover:bg-[#E06D43] text-white flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        <span>DEMO</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                    {active.githubUrl && (
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 text-xs font-mono rounded-xl border border-white/15 hover:border-white/40 text-white flex items-center gap-1.5 transition-colors bg-white/5"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>CODE</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-6 overflow-y-auto max-h-[40vh] sm:max-h-[50vh] scrollbar-thin scrollbar-thumb-white/10">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs sm:text-sm font-light leading-relaxed text-white/80 space-y-4"
                  >
                    {active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className={cn("max-w-7xl mx-auto w-full gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch", className)}>
        {items.map((item) => (
          <motion.div
            layoutId={`card-${item.title}-${id}`}
            key={item.id}
            onClick={() => setActive(item)}
            className="p-5 flex flex-col justify-between hover:bg-[#15151a] rounded-2xl cursor-pointer bg-[#111114] border border-white/10 hover:border-[#C75B32]/60 transition-all duration-300 group shadow-xl hover:-translate-y-1 space-y-4"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <motion.div layoutId={`image-${item.title}-${id}`}>
                  <div className="h-12 w-12 rounded-xl bg-[#18181c] border border-white/10 flex items-center justify-center text-[#C75B32] p-2 group-hover:border-[#C75B32]/40 transition-colors">
                    {item.icon || <span className="font-mono text-xs font-bold text-[#C75B32]">01</span>}
                  </div>
                </motion.div>
                {item.number && (
                  <span className="font-display font-bold text-2xl text-[#C75B32]">
                    {item.number}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-left">
                <motion.h3
                  layoutId={`title-${item.title}-${id}`}
                  className="font-display font-bold text-lg sm:text-xl uppercase text-white group-hover:text-[#C75B32] transition-colors"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${item.title}-${id}`}
                  className="text-xs font-mono text-[#8E8B85] line-clamp-2"
                >
                  {item.subtitle || item.description}
                </motion.p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs font-mono text-white/50 group-hover:text-white transition-colors">
              <span className="text-[10px] uppercase tracking-wider text-[#C75B32]">
                {item.category || 'PROJECT'}
              </span>
              <span className="group-hover:translate-x-1 transition-transform">
                EXPLORE ↗
              </span>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  )
}
