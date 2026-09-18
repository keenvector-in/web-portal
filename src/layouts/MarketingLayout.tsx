import { Button, Container, Link, Menu, NavLink, Outlet, X, useLocation } from "@keenvector/kvcl";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { env } from "../config/env";
import { ScrollProgress } from "../components/motion";
import { Logo } from "../components/Logo";
import { footerLinks, marketingNav, site } from "../config/site";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled ? "border-white/10 bg-ink-950/55 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150" : "border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {marketingNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-ink-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-logo-from to-accent-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button as={Link} to="/login" variant="ghost" size="md">
            Log in
          </Button>
          <Button as={Link} to="/register" variant="primary" size="md">
            Get started
          </Button>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink-200 hover:bg-white/5 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-white/5 bg-ink-950 md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {marketingNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-white/5 text-white" : "text-ink-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-2 px-3">
              <Button as={Link} to="/login" variant="ghost" size="md" onClick={() => setOpen(false)}>
                Log in
              </Button>
              <Button as={Link} to="/register" variant="primary" size="md" onClick={() => setOpen(false)}>
                Get started
              </Button>
            </div>
          </Container>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-ink-400">{site.description}</p>
          <a href={`mailto:${site.supportEmail}`} className="mt-3 inline-block text-sm text-ink-400 hover:text-white">
            {site.supportEmail}
          </a>
        </div>
        <FooterColumn title="Product" links={footerLinks.product} />
        <FooterColumn title="Company" links={footerLinks.company} />
        <FooterColumn title="Legal" links={footerLinks.legal} />
      </Container>
      <Container className="border-t border-white/5 py-6 text-xs text-ink-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="text-sm text-ink-400 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// KeenVector eats its own cooking: the marketing site carries the same
// embeddable chatbot a tenant would paste on theirs, pointed at the
// KeenVector tenant, so Vector pitches the product to visitors.
function useChatWidget() {
  useEffect(() => {
    if (!env.chatWidgetUrl || document.getElementById("keenvector-chat-script")) return;
    const s = document.createElement("script");
    s.id = "keenvector-chat-script";
    s.src = env.chatWidgetUrl;
    s.async = true;
    s.dataset.site = env.chatSiteSlug;
    if (env.chatApiBaseUrl) s.dataset.api = env.chatApiBaseUrl;
    document.body.appendChild(s);
  }, []);
}

export function MarketingLayout() {
  useChatWidget();
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <ScrollProgress />
      <Navbar />
      {/* Enter-only page transition: exit would need a frozen outlet, and the
          fade-in alone reads as a transition on a marketing site. */}
      <motion.main
        key={pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
