import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', he: 'משתמש' },
    plural: { en: 'Users', he: 'משתמשים' },
  },
  admin: {
    useAsTitle: 'email',
    group: { en: 'Admin', he: 'ניהול' },
  },
  auth: true,
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Name', he: 'שם' },
    },
  ],
}
