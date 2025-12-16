/**
 * Markdown parser for extracting feature data from spec files
 */

import * as fs from 'fs';
import { FeatureData } from './types';

/**
 * Parse requirements.md file
 */
export function parseRequirements(filePath: string): { title: string; description: string } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled Feature';

    // Extract description (text under ## Overview or first paragraph)
    let description = '';

    // Try to find Overview section
    const overviewMatch = content.match(/##\s+Overview\s*\n\n([\s\S]*?)(?=\n##|$)/);
    if (overviewMatch) {
      description = overviewMatch[1].trim();
      // Take first paragraph only
      const firstPara = description.split('\n\n')[0];
      description = firstPara.replace(/\n/g, ' ').trim();
    } else {
      // Fallback: get first paragraph after title
      const afterTitle = content.split(/^#\s+.+$/m)[1];
      if (afterTitle) {
        const paragraphs = afterTitle.trim().split('\n\n');
        for (const para of paragraphs) {
          // Skip empty or markdown syntax lines
          if (para.trim() && !para.startsWith('#') && !para.startsWith('-')) {
            description = para.replace(/\n/g, ' ').trim();
            break;
          }
        }
      }
    }

    return { title, description };
  } catch (error) {
    console.warn(`⚠️  Error parsing requirements: ${error}`);
    return { title: 'Unknown', description: '' };
  }
}

/**
 * Parse implementation-plan.md file
 */
export function parseImplementationPlan(filePath: string): Partial<FeatureData> {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Count checkboxes
    const totalCheckboxes = (content.match(/- \[(x| )\]/gi) || []).length;
    const completedCheckboxes = (content.match(/- \[x\]/gi) || []).length;

    // Calculate completion percentage
    const completionPercentage = totalCheckboxes > 0
      ? Math.round((completedCheckboxes / totalCheckboxes) * 100)
      : 0;

    // Determine status based on completion
    let status: FeatureData['status'];
    if (completionPercentage === 100) {
      status = 'completed';
    } else if (completionPercentage > 0) {
      status = 'in_progress';
    } else if (content.includes('⏳') || content.includes('Planned')) {
      status = 'planned';
    } else {
      status = 'not_started';
    }

    // Check for status indicators in content
    if (content.includes('✅') && completionPercentage > 80) {
      status = 'completed';
    } else if (content.includes('🟡')) {
      status = 'in_progress';
    } else if (content.includes('⏳')) {
      status = 'planned';
    }

    // Extract metadata
    const effortEstimate = extractEffortEstimate(content);
    const targetDate = extractTargetDate(content);
    const priority = extractPriority(content);

    // Extract features list
    const features = extractFeaturesList(content);

    return {
      status,
      completionPercentage,
      tasksTotal: totalCheckboxes,
      tasksCompleted: completedCheckboxes,
      effortEstimate,
      targetDate,
      priority,
      features,
    };
  } catch (error) {
    console.warn(`⚠️  Error parsing implementation plan: ${error}`);
    return {
      status: 'not_started',
      completionPercentage: 0,
      tasksTotal: 0,
      tasksCompleted: 0,
      features: [],
    };
  }
}

/**
 * Extract effort estimate from content
 */
function extractEffortEstimate(content: string): string | undefined {
  // Look for patterns like "Estimated Effort: 3-4 days" or "X days"
  const patterns = [
    /Estimated?\s+(?:Total\s+)?Effort:?\s*([^\n]+)/i,
    /Duration:?\s*([^\n]+)/i,
    /(\d+[-–]\d+\s+days?)/i,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}

/**
 * Extract target date from content
 */
function extractTargetDate(content: string): string | undefined {
  // Look for patterns like "Target: Sprint 3" or "2025-Q1"
  const patterns = [
    /Target:?\s*([^\n]+)/i,
    /Sprint\s+(\d+)/i,
    /(\d{4}-Q[1-4])/,
    /Due:?\s*([^\n]+)/i,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}

/**
 * Extract priority from content
 */
function extractPriority(content: string): FeatureData['priority'] | undefined {
  const lower = content.toLowerCase();

  if (lower.includes('priority: critical') || lower.includes('critical priority')) {
    return 'critical';
  } else if (lower.includes('priority: high') || lower.includes('high priority')) {
    return 'high';
  } else if (lower.includes('priority: medium') || lower.includes('medium priority')) {
    return 'medium';
  } else if (lower.includes('priority: low') || lower.includes('low priority')) {
    return 'low';
  }

  return undefined;
}

/**
 * Extract list of completed features
 */
export function extractCompletedFeatures(content: string): string[] {
  const features: string[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match lines with completed checkboxes
    const match = line.match(/^[\s-]*\[x\]\s+(.+)$/i);
    if (match) {
      const feature = match[1].trim();
      // Filter out very short or generic items
      if (feature.length > 10 && !feature.startsWith('Task ') && !feature.startsWith('Step ')) {
        features.push(feature);
      }
    }
  }

  return features;
}

/**
 * Extract list of in-progress features
 */
export function extractInProgressFeatures(content: string): string[] {
  const features: string[] = [];

  // Look for sections marked as in progress
  const inProgressSections = content.match(/🟡[\s\S]*?(?=\n##|$)/g) || [];

  for (const section of inProgressSections) {
    const lines = section.split('\n');
    for (const line of lines) {
      // Match lines with checkboxes (both checked and unchecked)
      const match = line.match(/^[\s-]*\[(x| )\]\s+(.+)$/i);
      if (match) {
        const feature = match[2].trim();
        if (feature.length > 10) {
          features.push(feature);
        }
      }
    }
  }

  return features;
}

/**
 * Extract list of planned features
 */
export function extractPlannedFeatures(content: string): string[] {
  const features: string[] = [];

  // Look for sections marked as planned
  const plannedSections = content.match(/⏳[\s\S]*?(?=\n##|$)/g) || [];

  for (const section of plannedSections) {
    const lines = section.split('\n');
    for (const line of lines) {
      // Match lines with unchecked checkboxes
      const match = line.match(/^[\s-]*\[ \]\s+(.+)$/);
      if (match) {
        const feature = match[1].trim();
        if (feature.length > 10) {
          features.push(feature);
        }
      }
    }
  }

  return features;
}

/**
 * Calculate completion percentage from checkboxes
 */
export function calculateCompletionPercentage(content: string): number {
  const total = (content.match(/- \[(x| )\]/gi) || []).length;
  const completed = (content.match(/- \[x\]/gi) || []).length;

  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Extract a general features list from the content
 */
function extractFeaturesList(content: string): string[] {
  const features: string[] = [];

  // Try to find a "Features" or "What's Included" section
  const featuresSection = content.match(/##\s+(?:Features|What's Included)[\s\S]*?(?=\n##|$)/i);

  if (featuresSection) {
    const lines = featuresSection[0].split('\n');
    for (const line of lines) {
      // Match bullet points or checkboxes
      const match = line.match(/^[\s-]*(?:\[(?:x| )\]\s+)?[-*]\s*(.+)$/);
      if (match) {
        const feature = match[1].trim();
        if (feature.length > 5) {
          features.push(feature);
        }
      }
    }
  }

  // If no features section found, extract from checkboxes
  if (features.length === 0) {
    const checkboxLines = content.match(/^[\s-]*\[(x| )\]\s+(.+)$/gm) || [];
    for (const line of checkboxLines) {
      const match = line.match(/\[(x| )\]\s+(.+)$/);
      if (match) {
        const feature = match[2].trim();
        // Only include high-level features (not sub-tasks)
        if (feature.length > 10 && !feature.startsWith('Create ') && !feature.startsWith('Add ')) {
          features.push(feature);
        }
      }
    }
  }

  // Limit to first 10 features to avoid cluttering
  return features.slice(0, 10);
}
