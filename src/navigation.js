import { getHomePermalink, getPermalink } from '~/utils/permalinks';
export const headerData = {
  links: [
    { text: 'Publications & Talks', href: getPermalink('/publications') },
    { text: 'CV', href: '/pdf/yarden-as-2022.pdf' },
    // { text: 'Stream of consciousness', href: '#' },
  ],
  position: 'right',
};

export const footerData = {
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://twitter.com/yarden_as' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/yardenas/' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/yardenas' },
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
    Made by <a href="${getHomePermalink()}" class="a-link">Yarden As</a> · Feel Free to use the  <a class="a-link" href="https://github.com/yardenas/yas.pub">Open Source Code</a> for this website.
  `,
};
