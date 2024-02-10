export const headerData = {};

export const footerData = {
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
    {
      ariaLabel: 'Google Scholar',
      icon: 'academicons:google-scholar',
      href: 'https://scholar.google.com/citations?user=Z0qGI_kAAAAJ&hl=en',
    },
    {
      ariaLabel: 'Spotify',
      icon: 'tabler:brand-spotify',
      href: 'https://open.spotify.com/user/2sw6f4s1ipwy7bqshxeoyrevn?si=0c242994bf654506',
    },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm"></span>
    Made by <a class="text-primary dark:text-gray-200"> Yarden As</a> · All rights reserved.
  `,
};
