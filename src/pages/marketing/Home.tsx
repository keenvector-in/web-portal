import { Badge, BarChart3, Button, Card, Link, Megaphone, PlayCircle, PlugZap, Rocket } from "@keenvector/kvcl";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { ChannelHub } from "../../components/ChannelHub";
import { WorkflowBackdrop } from "../../components/WorkflowBackdrop";
import { Reveal } from "../../components/motion";
import { Seo } from "../../components/Seo";
import { pricingPlans } from "../../config/pricing";
import { site } from "../../config/site";

const features = [
  {
    icon: Megaphone,
    title: "Multi-channel Campaigns",
    description: "Plan and launch WhatsApp and email campaigns from a single wizard, with priority lanes built in.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Revenue Attribution",
    description: "See exactly which message or campaign drove a payment — not just delivery rates.",
  },
  {
    icon: PlugZap,
    title: "Multi-channel Messaging",
    description: "WhatsApp, Email and Instagram — connected once, usable everywhere in the platform.",
  },
];

const steps = [
  { title: "Connect channels", description: "Link WhatsApp, Email and more in a guided onboarding flow." },
  { title: "Launch a campaign", description: "Send to a segment across every connected channel from one wizard." },
  { title: "Reply from one inbox", description: "Every conversation, every channel, in one place your team works from." },
  { title: "Track revenue", description: "Attribute every rupee back to the message that drove it." },
];

const ease = [0.22, 1, 0.36, 1] as const;
const headline = ["Multi-channel", "messaging,", "in", "one", "platform"];

/** Card whose border glow follows the cursor — CSS vars only, no re-render per move. */
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div
      onMouseMove={onMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`spotlight group relative h-full rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });
  const { scrollY } = useScroll();
  const auroraY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 180]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - r.left) / r.width - 0.5);
    tiltY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section data-motion className="relative isolate overflow-hidden">
      <motion.div aria-hidden style={{ y: auroraY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="aurora aurora-c" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <WorkflowBackdrop />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
              <Badge tone="neutral">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                </span>
                Built for Indian businesses
              </Badge>
            </motion.div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.05]">
              {headline.map((word, i) => (
                <motion.span
                  key={word}
                  className={`inline-block ${i >= 3 ? "shimmer-text" : ""}`}
                  initial={{ opacity: 0, y: reduce ? 0 : "0.5em", filter: reduce ? "none" : "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="mt-5 max-w-xl text-lg text-ink-300"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
            >
              Reach customers on WhatsApp, Instagram, SMS and Email — from one shared inbox, with team alerts on Slack, email, SMS or WhatsApp, plus campaigns and analytics built in.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease }}
            >
              <Button as={Link} to="/register" size="lg" className="group relative overflow-hidden">
                <span className="sheen" aria-hidden />
                <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-12" /> Start free trial
              </Button>
              <Button as={Link} to="/contact" variant="secondary" size="lg">
                <PlayCircle className="h-4 w-4" /> Book a demo
              </Button>
            </motion.div>
          </div>

          <motion.div
            onMouseMove={onMove}
            onMouseLeave={() => (tiltX.set(0), tiltY.set(0))}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            style={{ perspective: 900 }}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="float">
              <ChannelHub className="mx-auto w-fit" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section data-motion className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-white">How it works</h2>
        </Reveal>
        <div ref={ref} className="relative mt-12">
          {/* Connector draws itself as the steps scroll through view. */}
          <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px bg-white/10 lg:block">
            <motion.div style={{ scaleX: line }} className="h-full origin-left bg-gradient-to-r from-logo-from via-logo-via to-accent-400" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <Card className="relative h-full transition-colors hover:border-brand-400/40">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-400/40 bg-ink-950 font-display text-sm font-bold text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-300">{s.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Seo title="KeenVector — Multi-channel messaging for growing businesses" description={site.description} />

      <Hero />

      <section data-motion className="border-y border-white/5 bg-ink-900/40 py-20">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white">Everything you need to talk to customers</h2>
          <p className="mt-3 text-ink-300">One platform for messaging and the numbers that prove it's working.</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <SpotlightCard>
                <Card className="h-full">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <f.icon className="h-6 w-6 text-brand-400" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-300">{f.description}</p>
                </Card>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      <HowItWorks />

      <section data-motion className="border-t border-white/5 bg-ink-900/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-white">Simple, transparent pricing</h2>
            <p className="mt-3 text-ink-300">Start free. Upgrade as you grow.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan, i) => {
              const featured = plan.name === "Growth";
              return (
                <Reveal key={plan.name} delay={i * 0.08} className="h-full">
                  <SpotlightCard className={featured ? "gradient-ring" : ""}>
                    <Card className={`flex h-full flex-col ${featured ? "border-transparent" : ""}`}>
                      <div className="flex items-center gap-2">
                        <p className="font-display text-lg font-semibold text-white">{plan.name}</p>
                        {featured ? (
                          <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 text-[11px] font-medium text-brand-300">Most popular</span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-ink-400">{plan.tagline}</p>
                      <p className="mt-4 font-display text-2xl font-bold text-white">
                        {plan.prices["1,000"] === null ? "Custom" : `₹${plan.prices["1,000"].toLocaleString("en-IN")}`}
                        {plan.prices["1,000"] !== null ? <span className="text-sm font-normal text-ink-400">/mo</span> : null}
                      </p>
                      <ul className="mt-4 flex-1 space-y-2 text-xs text-ink-300">
                        <li>{plan.users}</li>
                        {plan.features.slice(0, 3).map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <Button
                        as={Link}
                        to={plan.cta === "Talk to sales" ? "/contact" : "/register"}
                        variant={featured ? "primary" : "secondary"}
                        className="mt-5 w-full"
                      >
                        {plan.cta}
                      </Button>
                    </Card>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link to="/pricing" className="group text-sm font-medium text-brand-300">
              See full plan comparison <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
