export default function Footer() {
  const linkGroups = [
    ['About', 'Collection', 'Shop', 'Contact'],
    ['FAQs', 'Shipping', 'Returns', 'Terms'],
    ['Instagram', 'Facebook', 'X', 'Pinterest'],
    ['Support', 'Privacy', 'Orders', 'Account'],
  ];

  return (
    <footer className="font-body bg-[#111111] px-6 py-12 text-white sm:px-10 md:px-16 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_3fr] md:gap-16">
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-normal">ChitraTech Shop</h3>
            <p className="mt-1 font-body text-sm font-normal text-white/80">Shop Company</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {linkGroups.map((links, groupIndex) => (
              <ul key={groupIndex} className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-white/88 transition-colors hover:text-white">
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
          <p className="mt-1 font-body text-xs text-white/80">©Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
