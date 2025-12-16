Installation
PrismUI is built on top of shadcn/ui, extending it with beautiful animations and advanced components. Follow these steps to set up your project.

Setup
Create a new Next.js project with shadcn/ui
First, create a new Next.js project and initialize shadcn/ui:

pnpm dlx shadcn@latest init
You can use the -d flag for default settings (New York style, Zinc color, and CSS variables):

pnpm dlx shadcn@latest init -d
Configure components.json
When running the init command, you'll be asked to configure your components.json:

Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › yes
Install additional dependencies
PrismUI requires some additional dependencies for animations and advanced features:

pnpm add framer-motion
pnpm add tailwindcss-animate
pnpm add lucide-react
Install base shadcn/ui components
PrismUI builds on top of several shadcn/ui base components. Install them:

pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add separator
Install PrismUI components
Finally, install PrismUI components:

pnpm dlx shadcn@latest add "https://www.prismui.tech/r/styles/default/expandable-card.json"
Next Steps
Now that you have PrismUI set up, you can start using our animated components:

Browse the components section to see our extended component collection
Check out our templates for example layouts