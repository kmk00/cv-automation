
# Cv automation

## 📄 Description

This web application allows users to automatically tailor their CVs to specific job offers. The user begins by pasting a job description into the app. Based on the extracted keywords, requirements, and responsibilities, the application intelligently fills in a pre-defined LaTeX CV template customized to the user's profile.

Once the CV is generated, it is compiled into a PDF and automatically uploaded to the user's Google Drive for easy access and sharing. The app streamlines the process of creating personalized, professional CVs for each application, saving time and increasing the chances of standing out to recruiters.

This project combines natural language processing, LaTeX document generation, and cloud integration to offer a smart solution for job seekers.


https://youtu.be/reh1qM6wNS0


## 🔑 Key Features

- 🔍 Job description parsing and keyword extraction  
- 📝 Dynamic content insertion into a LaTeX CV template  
- 📄 Automatic PDF generation  
- ☁️ Seamless integration with Google Drive (PDF upload)


## 🧰 Tech Stack

### Frontend
- **React** – UI library for building responsive user interfaces  
- **TypeScript** – Type-safe JavaScript development  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **React Hook Form** – Form handling and validation  
- **TanStack React Query** – Data fetching, caching, and synchronization  
- **Zustand** – Lightweight state management  
- **Axios** – HTTP client for API requests  

### Backend
- **Fastify** – High-performance Node.js web framework  
- **TypeScript** – Type-safe server-side logic  
- **Fastify CORS & Multipart** – CORS support and file upload handling  
- **Handlebars** – Templating engine for dynamic LaTeX content  
- **node-latex** – LaTeX to PDF generation  
- **OpenAI SDK** – AI-powered content generation from job descriptions  
- **Google APIs (Drive)** – Integration for PDF upload to Google Drive  
- **MiKTeX** -  System tool for compiling `.tex` files to PDF
## ⚙️ How It Works

**Google Authentication**  
   The user signs in with their Google account to enable secure access and upload capabilities to their personal Google Drive.

**Paste Job Description**  
   The user pastes a job offer into the application. This job description serves as the input for tailoring the CV.

**AI-Powered Analysis**  
   The pasted job offer is analyzed by OpenAI's GPT model. Based on the content, it updates and adjusts the user's existing CV data (stored in a JSON profile) to better match the job requirements.

**Preview and Edit**  
   The user can review the updated CV information in a user-friendly form and manually make any additional changes if necessary.

**Generate CV (LaTeX + PDF)**  
   After confirming the content, the updated data is dynamically inserted into a LaTeX `.tex` template. The LaTeX engine (e.g. MiKTeX) compiles it into a polished PDF.

**Upload to Google Drive**  
   Once the PDF is successfully generated, it is automatically uploaded to the user’s Google Drive.

**Download & History**  
   The user is shown a final screen with a link to:
   - Directly download the newly generated PDF
   - Open their Google Drive folder containing all previously generated CVs


## 📚 Lessons Learned

- **Integrating Google Drive API requires careful handling of authentication and permissions**  

- **Prompt engineering with GPT greatly affects the quality of CV tailoring**  
  Fine-tuning prompts and formatting input/output data were crucial to ensure accurate and relevant CV modifications.

- **Dynamic LaTeX generation can be both powerful and fragile**  
  Generating `.tex` files on the fly worked well, but required strict control over syntax and escaping special characters to avoid compilation errors.

- **Providing user-friendly previews before generation improves trust and usability**  
  Letting users preview and edit AI-generated content added an important layer of control and transparency to the process.

- **Frontend and backend synchronization is key when working with structured data**  
  Ensuring consistent schema and validation between user inputs, AI output, and LaTeX template placeholders helped avoid formatting issues.

- **Maintaining modularity makes the system easier to extend**  
  Separating the job parsing, user data, template engine, and cloud integration helped keep the codebase clean and maintainable.



## ✏ TODO

- Unit tests for core logic
- Integration tests for API routes and LaTeX generation
- End-to-end tests for the full CV creation flow
- Dockerize the App
- Add user profile management (e.g., ability to store multiple CV versions)
- Add CV templates selection (multiple `.tex` themes)
- Show PDF preview directly in the browser before upload
