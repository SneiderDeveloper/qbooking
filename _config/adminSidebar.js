const pages = config('pages') // Get Pages from config

//Blog
export default [
  {
    title: 'ibooking.cms.sidebar.adminGroup',
    icon: 'fa-light fa-check-to-slot',
    children: [
      pages.mainqbooking.categories,
      pages.mainqbooking.services,
      pages.qbooking.resources,
      pages.mainqbooking.reservations
    ]
  },
]
