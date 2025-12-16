Expandable Card
An interactive, expandable card component for displaying project status and details with smooth animations.

Christer Hagen
Written by Christer Hagen

Last updated Jan 2
Preview
Code

In Progress
UI Component Library

Progress
75%
Last updated: 2 hours ago
5 open issues
The Expandable Card component provides an elegant way to display project status information with an expandable interface. Perfect for project dashboards, task management, and GitHub repository overviews.

Installation
CLI
Manual
Copy
npx shadcn@latest add "https://www.prismui.tech/r/styles/default/expandable-card.json"
Examples
Preview
Code

Completed
Design System

Progress
100%
Last updated: 2 hours ago
/
0 open issues
In Progress
Analytics Dashboard

Progress
45%
Last updated: 2 hours ago
/
8 open issues
Hooks
You also need to install the useExpandable hook.

Component use-expandable not found in registry.

Usage
Basic Usage
import { ProjectStatusCard } from "@/components/prismui/expandable-card"
 
export default function Example() {
  return (
    <ProjectStatusCard
      title="UI Component Library"
      progress={75}
      dueDate="Jan 15, 2024"
      contributors={[
        { name: "Sarah" },
        { name: "Mike" },
        { name: "Alex" },
        { name: "Emma" }
      ]}
      tasks={[
        { title: "Update Button Components", completed: true },
        { title: "Add Dark Mode Support", completed: true },
        { title: "Implement Form Validation", completed: false },
        { title: "Write Documentation", completed: false }
      ]}
      githubStars={128}
      openIssues={5}
    />
  )
}
Types
interface Contributor {
  name: string;
  image?: string;
}
 
interface Task {
  title: string;
  completed: boolean;
}
 
interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  contributors: Contributor[];
  tasks: Task[];
  githubStars: number;
  openIssues: number;
}
Customization
Custom Animation Settings
<motion.div
  style={{ height: animatedHeight }}
  transition={{ 
    type: "spring", 
    stiffness: 300, 
    damping: 30 
  }}
>
  {/* ... */}
</motion.div>
Custom Styling
<Card className="w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg">
  {/* ... */}
</Card>
Custom Badge Colors
<Badge
  variant="secondary"
  className={
    progress === 100
      ? "bg-green-100 text-green-600"
      : "bg-blue-100 text-blue-600"
  }
>
  {progress === 100 ? "Completed" : "In Progress"}
</Badge>
Notes
Built with Framer Motion for smooth animations
Uses Lucide React for consistent iconography
Responsive design with mobile-first approach
Interactive expand/collapse functionality
TypeScript support with proper types
Integrates with Shadcn UI components
Supports custom styling and theming
Optimized performance with proper hooks usage
Features
Smooth expand/collapse animations
Progress tracking
Contributor avatars with tooltips
Task completion status
GitHub integration display
Interactive buttons and badges
Responsive layout
Accessibility features
Props
Prop	Type	Description
title	string	Project title
progress	number	Progress percentage (0-100)
dueDate	string	Project due date
contributors	Contributor[]	Array of project contributors
tasks	Task[]	Array of project tasks
githubStars	number	Number of GitHub stars
openIssues	number	Number of open issues