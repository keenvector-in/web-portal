import { Button, Container } from "@keenvector/kvcl";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { footerLinks, marketingNav, site } from "../config/site";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {marketingNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-ink-300 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button as={Link} to="/login" variant="ghost" size="md">
            Log in
          </Button>
          <Button as={Link} to="/register" variant="primary" size="md">
            Get started
          </Button>
        </div>
      </Container>
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

export function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
