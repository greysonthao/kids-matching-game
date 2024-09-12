# Next.js Template with Tailwind CSS and Shadcn/UI

This template provides a pre-configured setup for building modern web applications using Next.js, Tailwind CSS, and Shadcn/UI. It's designed to get you up and running quickly with a robust and scalable foundation.

## Features

- [Next.js](https://nextjs.org/) - React framework for building fast and scalable web applications
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- TypeScript support
- ESLint and Prettier for code linting and formatting
- Pre-configured directory structure

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/nextjs-tailwind-shadcn-template.git
   cd nextjs-tailwind-shadcn-template
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
.
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
├── styles/
│   └── globals.css
├── public/
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Adding Shadcn/UI Components

This template comes pre-configured with Shadcn/UI. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

Replace `[component-name]` with the name of the component you want to add (e.g., `button`, `dialog`, etc.).

## Customization

- Tailwind CSS: Customize your design tokens in `tailwind.config.js`
- Shadcn/UI: Modify component styles in `components/ui/`
- Global styles: Edit `styles/globals.css` for app-wide styles

## Deployment

This template is ready for deployment on platforms like Vercel, Netlify, or any other hosting service that supports Next.js applications.

For more information on deployment, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Learn More

To learn more about the technologies used in this template, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
