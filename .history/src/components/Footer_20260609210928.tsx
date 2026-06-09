import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const linkGroups = [
    ['Weekly Themes', 'Pre-Sale FAQs', 'Submit A Ticket'],
    ['Services', 'Theme Tweak'],
    ['Showcase', 'Widgetkit', 'Support'],
    ['About Us', 'Contact Us', 'Affiliates', 'Resources'],
  ];

  const socials = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Github, label: 'GitHub' },
  ];

  return (
    <footer className="bg-[#111111] px-6 py-12 text-white sm:px-10 md:px-16 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_3fr] md:gap-16">
          <div>
            <h3 className="font-body text-2xl font-bold uppercase tracking-[0.12em]">ChitraTech</h3>
            <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              Shop Company
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {linkGroups.map((links, groupIndex) => (
              <ul key={groupIndex} className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-white/88 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="my-10 h-px bg-white/28 md:my-14" />

        <div className="flex flex-col items-center">
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white/90 transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
              >
                <Icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>
          <p className="mt-5 font-body text-xs text-white/80">
            ©Copyright. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}