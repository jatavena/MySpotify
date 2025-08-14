# MySpotify
A Spotify Web API integration built as a foundational learning project for implementing OAuth 2.0 PKCE authentication and API data fetching. This project serves as a prerequisite study for building **Jammming** - a bit more complex application that searches Spotify's music library, creates custom playlists, and saves them to user accounts.

## Project Context
This simplified profile viewer was created to understand the core concepts needed for the main Jammming application:

- OAuth 2.0 PKCE authentication flow with Spotify
- API request handling with proper authorization headers
- User session management and token handling
- GitHub Pages deployment challenges and solutions

The skills developed here directly translate to Jammming's requirements for authenticated music search, playlist creation, and playlist saving functionality.

## Development Journey
### Initial Approach: TypeScript + Vite + Local Development

- Started with TypeScript following Spotify's official tutorial
- Used Vite development server with TypeScript compilation
- **Challenges**: 
  - OAuth callback handling in localhost environment

### Migration to GitHub Pages

- Switched to GitHub Pages for stable HTTPS hosting
- **Major Issue**: GitHub Pages doesn't support TypeScript compilation
- **Solution**: Converted TypeScript code to vanilla JavaScript
- **Additional Issues**:
  - Jekyll processing interference
  - OAuth callback URL handling with query parameters
  - Silent UI failures due to missing HTML elements



### Final Solution
#### Technical fixes that resolved the issues:

- Disabled Jekyll: Added .nojekyll file to prevent static asset processing
- Added 404.html: Created fallback page to handle OAuth callback redirects
- Improved error handling: Added comprehensive logging and user feedback
- Fixed DOM manipulation: Ensured all required HTML elements exist before populating
- Enhanced debugging: Added status indicators to identify failure points in OAuth flow

### Key Learnings

- OAuth 2.0 PKCE flow implementation with Spotify Web API
- GitHub Pages quirks: Jekyll interference, callback URL handling
- Debugging techniques: Step-by-step logging for complex authentication flows
- Silent failure patterns: Importance of validating DOM elements before manipulation

This foundation enables confident implementation of Jammming's more advanced features like playlist management and music search functionality.
