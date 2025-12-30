'use client';

import { ReactNode, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Accordion Context
interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

// Accordion Root
interface AccordionProps {
  children: ReactNode;
  type?: 'single' | 'multiple';
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  children,
  type = 'single',
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(id) ? [] : [id]);
    } else {
      setOpenItems(
        openItems.includes(id)
          ? openItems.filter((item) => item !== id)
          : [...openItems, id]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('divide-y divide-[var(--border)]', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// Accordion Item
interface AccordionItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <div className={cn('', className)} data-state={isOpen ? 'open' : 'closed'}>
      {children}
    </div>
  );
}

// Accordion Trigger
interface AccordionTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function AccordionTrigger({ children, value, className }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <button
      onClick={() => toggleItem(value)}
      className={cn(
        'flex items-center justify-between w-full py-4 text-left font-medium transition-colors hover:text-[var(--primary)]',
        className
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          'w-4 h-4 text-[var(--foreground-secondary)] transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

// Accordion Content
interface AccordionContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function AccordionContent({ children, value, className }: AccordionContentProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn('pb-4 text-[var(--foreground-secondary)]', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
