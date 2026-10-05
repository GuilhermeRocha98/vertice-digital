"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ScrambleHover, useEntrance } from "@/components/motion";
import { VerticeLogo } from "@/components/logo";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
];

const SPRING = { type: "spring", stiffness: 350, damping: 28 } as const;
const MENU_OPEN_WIDTH = 350;

function SquashHamburger({ isOpen, mobile = false }: { isOpen: boolean; mobile?: boolean }) {
  const width = mobile ? 15 : 18;
  const height = mobile ? 10 : 12;
  const bar = mobile ? 1.2 : 1.5;
  const center = (height - bar) / 2;
  const spring = { type: "spring", stiffness: 300, damping: 20 } as const;

  return (
    <span className="relative block" style={{ width, height }} aria-hidden="true">
      <motion.span
        className="absolute left-0 top-0 w-full rounded-full bg-white"
        style={{ height: bar }}
        animate={isOpen ? { y: center, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        className="absolute left-0 w-full rounded-full bg-white"
        style={{ height: bar, top: center }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      <motion.span
        className="absolute bottom-0 left-0 w-full rounded-full bg-white"
        style={{ height: bar }}
        animate={isOpen ? { y: -center, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={spring}
      />
    </span>
  );
}

function NavLink({ label, href, onClick, className }: { label: string; href: string; onClick: () => void; className: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`whitespace-nowrap text-white/85 transition-colors hover:text-white ${className}`}
    >
      <ScrambleHover text={label} isHovered={hovered} />
    </a>
  );
}

function CtaButton({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="#contato"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
      whileTap={{ scale: 0.97 }}
      className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white text-black ${
        mobile ? "h-9 px-3.5 text-[13px]" : "h-12 px-6 text-[15px]"
      }`}
    >
      <MessageSquare size={mobile ? 14 : 16} strokeWidth={1.8} />
      <ScrambleHover text="Orçamento" isHovered={hovered} />
    </motion.a>
  );
}

function LogoPill({ mobile = false }: { mobile?: boolean }) {
  return (
    <motion.a
      href="#top"
      aria-label="Vértice Digital, início"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.22)" }}
      whileTap={{ scale: 0.98 }}
      className={`flex shrink-0 items-center gap-2.5 bg-white/15 backdrop-blur-md ${
        mobile ? "h-9 rounded-[10px] px-3" : "h-12 rounded-[14px] px-5"
      }`}
    >
      <VerticeLogo className={`text-white ${mobile ? "h-4 w-4" : "h-[18px] w-[18px]"}`} />
      <span className={`font-medium tracking-tight text-white ${mobile ? "text-[13px]" : "text-[16px]"}`}>Vértice</span>
    </motion.a>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const entranceComplete = useEntrance();
  const close = () => setIsOpen(false);
  const toggleLabel = isOpen ? "Fechar menu" : "Abrir menu";

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex h-20 items-center px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop */}
      <div className="hidden w-full items-center justify-between sm:flex">
        <div className="flex items-center gap-2">
          <div className={isOpen ? "hidden md:flex" : "flex"}>
            <LogoPill />
          </div>

          <motion.nav
            className="flex h-12 items-center overflow-hidden rounded-[14px] bg-white/15 backdrop-blur-md"
            initial={false}
            animate={{ width: isOpen ? MENU_OPEN_WIDTH : 48 }}
            transition={SPRING}
          >
            <button
              type="button"
              aria-label={toggleLabel}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className={`flex shrink-0 items-center justify-center transition-colors ${
                isOpen ? "ml-1.5 h-9 w-9 rounded-[11px] bg-white/10 hover:bg-white/20" : "h-12 w-12 rounded-[14px]"
              }`}
            >
              <SquashHamburger isOpen={isOpen} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="flex items-center gap-6 pl-5 pr-5"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25, delay: 0.08 }}
                >
                  {navItems.map((item) => (
                    <NavLink key={item.href} {...item} onClick={close} className="text-[16px]" />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>

        <CtaButton />
      </div>

      {/* Mobile */}
      <div className="flex w-full items-center gap-2 sm:hidden">
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ width: isOpen ? 0 : "auto", opacity: isOpen ? 0 : 1 }}
          transition={SPRING}
        >
          <LogoPill mobile />
        </motion.div>

        <motion.nav
          className="flex h-9 items-center overflow-hidden rounded-[10px] bg-white/15 backdrop-blur-md"
          initial={false}
          animate={{ width: isOpen ? "100%" : 36 }}
          transition={SPRING}
        >
          <button
            type="button"
            aria-label={toggleLabel}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className={`flex shrink-0 items-center justify-center transition-colors ${
              isOpen ? "ml-1 h-7 w-7 rounded-[8px] bg-white/10" : "h-9 w-9 rounded-[10px]"
            }`}
          >
            <SquashHamburger isOpen={isOpen} mobile />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="flex flex-1 items-center justify-around px-2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25, delay: 0.08 }}
              >
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} onClick={close} className="text-[13px]" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <div className="flex-1" />

        {/* Com o menu aberto o botão sai de cena para os links caberem na largura do celular */}
        <AnimatePresence initial={false}>
          {!isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CtaButton mobile />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
