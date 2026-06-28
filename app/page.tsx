'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  // Refined, slower editorial animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-5 w-5 bg-zinc-950" />
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-950">
              MarketFlow
            </span>
          </motion.div>

          <nav className="hidden md:flex gap-10">
            {['Home', 'Services', 'Features', 'Contact'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                  className="text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-zinc-950 transition-colors duration-300"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          <Link href="/login">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:block bg-zinc-950 text-white px-6 py-3 rounded-none text-xs font-semibold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors duration-300"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Minimalist Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="py-20 lg:py-0 z-10"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-6"
            >
              Enterprise Automation
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-light tracking-tight text-zinc-900 leading-[1.1]"
            >
              Scale with <br />
              <span className="font-medium">precision.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-zinc-500 mt-8 text-lg font-light leading-relaxed max-w-md"
            >
              Orchestrate elite WhatsApp campaigns, tailored email sequences, and uncompromising
              customer engagement through our bespoke platform.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-12">
              <button className="flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-none text-xs font-semibold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all duration-300">
                Begin Journey <ArrowRight size={16} strokeWidth={1.5} />
              </button>
              <button className="bg-transparent text-zinc-900 border border-zinc-300 px-8 py-4 rounded-none text-xs font-semibold uppercase tracking-[0.2em] hover:bg-zinc-50 transition-all duration-300">
                Inquire Now
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Editorial Image & Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="hidden lg:block relative h-[80vh] w-full bg-zinc-100"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1720430157103-985dfc0e6825?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdoYXRzYXBwJTIwYnVzaW5lc3N8ZW58MHx8MHx8fDA%3D')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

            <div className="absolute bottom-12 left-12 right-12 text-white">
              <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
                <div>
                  <h4 className="text-3xl font-light tracking-tight">99.9%</h4>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mt-2">
                    Delivery Rate
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-light tracking-tight">2.4x</h4>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mt-2">
                    Engagement Lift
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4">
              Our Expertise
            </p>
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-zinc-900">
              Refined marketing capabilities.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-0 border border-zinc-200"
          >
            {[
              {
                icon: MessageCircle,
                title: 'Direct Messaging',
                desc: 'Uncompromising bulk WhatsApp communication directly to your premium clientele.',
              },
              {
                icon: Mail,
                title: 'Editorial Campaigns',
                desc: 'Craft and dispatch visually stunning, highly tailored email newsletters.',
              },
              {
                icon: Send,
                title: 'Automated Journeys',
                desc: 'Establish seamless, intelligent follow-ups that respect your brand’s cadence.',
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-white p-12 border-b md:border-b-0 md:border-r border-zinc-200 last:border-0 hover:bg-zinc-950 hover:text-white transition-colors duration-500"
              >
                <service.icon
                  size={32}
                  strokeWidth={1}
                  className="mb-8 text-zinc-900 group-hover:text-white transition-colors duration-500"
                />
                <h3 className="text-2xl font-light tracking-tight mb-4">{service.title}</h3>
                <p className="text-sm font-light leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors duration-500">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-950 text-white pt-24 pb-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-16 md:gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-5 w-5 bg-white" />
              <span className="text-sm font-semibold uppercase tracking-[0.3em]">MarketFlow</span>
            </div>
            <p className="text-xs font-light tracking-wide leading-relaxed text-zinc-500">
              The premier platform for exclusive, high-impact automated communications.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 mb-6">
              Capabilities
            </h4>
            <ul className="space-y-4 text-sm font-light text-zinc-500">
              {['Direct Messaging', 'Editorial Email', 'Logic Automation', 'Audience Curation'].map(
                (link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 mb-6">
              Institution
            </h4>
            <ul className="space-y-4 text-sm font-light text-zinc-500">
              {['Our Story', 'Membership', 'Journal', 'Inquiries'].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 mb-6">
              Concierge
            </h4>
            <div className="space-y-4 text-sm font-light text-zinc-500">
              <p className="hover:text-white transition-colors cursor-pointer">
                concierge@marketflow.com
              </p>
              <p className="hover:text-white transition-colors cursor-pointer">+91 79992 67389</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24">
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-600 tracking-wider">
            <p>© {new Date().getFullYear()} MarketFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-zinc-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
