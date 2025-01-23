
# Open-source text paster / code snippet app 
<sup>aka Txtdump</sup>

An open-source, web-based text/code snippet sharing application called "TextOcean" - similar to Pastebin or GitHub Gists.

***Key features:***
- Multi-language code editor with syntax highlighting (toggle, raw view)
- Cloud sync via Supabase
- Save/update/delete/load pastes
- Copy to clipboard functionality
- Responsive layout with expandable editor and collapsible sidebar
- Completely open-source

***Shortlisted Features:***
- Allow sharing text files via secure, unlisted links
- Remove OAuth login method alltogether and use a privacy-focused method instead utilizing unique, random identifier links.
- Complete mobile responsiveness 

***"Maybe Later" Features:***
- Improved syntax highlighting (very basic for whats available atm)
- More syntax highlighting language options

## Shareable Link Privacy Enhancements
- **Level 1: Unlisted (default)**<br>
Cannot be found without knowing the random identifier URL. If someone knows the identifier, they can view the contents. Intended for non-sensitive data only.
- **Level 2: Unlisted - Passworded**<br>
Cannot be found without knowing the random identifier URL. If someone knows the identifier, they must enter a password to view the contents.
- **Level 3: Unlisted - Collaborative**<br>
Cannot be found without knowing the random identifier URL. If someone knows the identifier, they must enter a password to view and edit the contents.
- **Level 4: Private**<br>
Cannot be found without knowing the random identifier URL. If someone knows the identifier, they must enter a password to view or edit the contents. Data is encrypted.
- **Additional Toggles:**
    - Burn: File is automatically deleted after being viewed.
    - Expiry: User selects a value up to 7 days and the file is deleted after that time passes.

## Demo (needs to be updated)
[![txtdumpdemo.gif](https://i.postimg.cc/c4n8rb1R/txtdumpdemo.gif)](https://postimg.cc/ZCJqQjdn)
