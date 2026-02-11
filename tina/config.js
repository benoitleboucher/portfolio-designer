import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.VITE_TINA_BRANCH || process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.VITE_TINA_CLIENT_ID || null, // Get this from tina.io
  token: process.env.VITE_TINA_TOKEN || null, // Get this from tina.io
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'hero',
        label: 'Hero Section',
        path: 'content/hero',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'greeting',
            label: 'Greeting',
            required: true,
          },
          {
            type: 'string',
            name: 'name',
            label: 'Your Name',
            required: true,
          },
          {
            type: 'string',
            name: 'title',
            label: 'Job Title',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'ctaText',
            label: 'Call to Action Button Text',
          },
          {
            type: 'image',
            name: 'profileImage',
            label: 'Profile Image',
          },
        ],
      },
      {
        name: 'about',
        label: 'About Section',
        path: 'content/about',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Section Title',
          },
          {
            type: 'rich-text',
            name: 'description',
            label: 'Description',
          },
          {
            type: 'image',
            name: 'image',
            label: 'About Image',
          },
          {
            type: 'object',
            name: 'stats',
            label: 'Statistics',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'value',
                label: 'Value',
              },
              {
                type: 'string',
                name: 'label',
                label: 'Label',
              },
            ],
          },
        ],
      },
      {
        name: 'project',
        label: 'Projects',
        path: 'content/projects',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Project Title',
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: ['web', 'mobile', 'branding'],
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Short Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'rich-text',
            name: 'fullDescription',
            label: 'Full Description',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'image',
            name: 'image',
            label: 'Thumbnail Image',
          },
          {
            type: 'image',
            name: 'gallery',
            label: 'Gallery Images',
            list: true,
          },
          {
            type: 'string',
            name: 'link',
            label: 'Project Link',
          },
        ],
      },
      {
        name: 'skill',
        label: 'Skills',
        path: 'content/skills',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'designTools',
            label: 'Design Tools',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Tool Name',
              },
              {
                type: 'number',
                name: 'level',
                label: 'Skill Level (0-100)',
              },
            ],
          },
          {
            type: 'object',
            name: 'devSkills',
            label: 'Development Skills',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Skill Name',
              },
              {
                type: 'number',
                name: 'level',
                label: 'Skill Level (0-100)',
              },
            ],
          },
          {
            type: 'object',
            name: 'softSkills',
            label: 'Soft Skills',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Skill Name',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Description',
              },
            ],
          },
        ],
      },
      {
        name: 'accomplishment',
        label: 'Accomplishments',
        path: 'content/accomplishments',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'organization',
            label: 'Organization',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'year',
            label: 'Year',
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon Name',
            description: 'Lucide React icon name (e.g., Trophy, Award, Star)',
          },
        ],
      },
      {
        name: 'contact',
        label: 'Contact Section',
        path: 'content/contact',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Section Title',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'email',
            label: 'Email Address',
          },
          {
            type: 'string',
            name: 'phone',
            label: 'Phone Number',
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Links',
            fields: [
              {
                type: 'string',
                name: 'linkedin',
                label: 'LinkedIn URL',
              },
              {
                type: 'string',
                name: 'dribbble',
                label: 'Dribbble URL',
              },
              {
                type: 'string',
                name: 'behance',
                label: 'Behance URL',
              },
              {
                type: 'string',
                name: 'twitter',
                label: 'Twitter URL',
              },
            ],
          },
        ],
      },
    ],
  },
});
