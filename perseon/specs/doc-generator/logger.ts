/**
 * Logger utility for colored console output
 */

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

/**
 * Log a standard message
 */
export function log(message: string): void {
  console.log(message);
}

/**
 * Log a success message (green with checkmark)
 */
export function success(message: string): void {
  console.log(`${colors.green}✓ ${message}${colors.reset}`);
}

/**
 * Log an error message (red with X)
 */
export function error(message: string): void {
  console.error(`${colors.red}✗ ${message}${colors.reset}`);
}

/**
 * Log a warning message (yellow with warning sign)
 */
export function warn(message: string): void {
  console.warn(`${colors.yellow}⚠ ${message}${colors.reset}`);
}

/**
 * Log an info message (cyan with info icon)
 */
export function info(message: string): void {
  console.log(`${colors.cyan}ℹ ${message}${colors.reset}`);
}

/**
 * Log a step in a process (bright white)
 */
export function step(message: string): void {
  console.log(`${colors.bright}${message}${colors.reset}`);
}

/**
 * Log a dimmed/secondary message
 */
export function dim(message: string): void {
  console.log(`${colors.dim}${message}${colors.reset}`);
}

/**
 * Create a formatted section header
 */
export function section(title: string): void {
  console.log(`\n${colors.bright}${colors.cyan}${title}${colors.reset}`);
}

/**
 * Log a spinner-like message (in progress)
 */
export function progress(message: string): void {
  console.log(`${colors.blue}⟳ ${message}${colors.reset}`);
}
