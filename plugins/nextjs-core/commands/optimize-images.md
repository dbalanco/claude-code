---
description: Optimize and implement Next.js Image components
---

# Optimize Images

Implement or optimize Next.js Image components with proper configuration and best practices.

## Instructions

1. Search for image usage in the codebase (img tags, Image components)
2. For each image:
   - Convert img tags to next/image Image components
   - Add proper width and height attributes
   - Use appropriate loading strategy (lazy, eager, priority)
   - Add alt text for accessibility
   - Consider using fill for responsive images
   - Implement proper sizes attribute for responsive images
3. Check next.config.js for image configuration:
   - Add remote image domains/patterns if needed
   - Configure image formats (webp, avif)
   - Set device sizes and image sizes
4. Implement image optimization strategies:
   - Use priority for above-the-fold images
   - Use placeholder blur for better UX
   - Optimize image sources
5. Consider implementing a custom loader if using external CDN

## Image Configuration Example

```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}
```

Ensure all images follow Next.js best practices for optimal performance.
