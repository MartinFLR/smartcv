<br />
<div align="center" >

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
![Open Source](https://img.shields.io/badge/open%20source-%E2%9D%A4-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome!-brightgreen.svg)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/MartinFLR/smartcv)

<a id="readme-top"></a>

  <a href="https://github.com/martinFLR/smartcv">
    <img src="/apps/frontend/public/assets/logo.png" alt="Logo" width="100" height="100">
  </a>
<h3 align="center">SmartCv</h3>
  <p align="center">
    A self-hosted, open-source AI assistant that helps you analyze, optimize, and match resumes to job descriptions.
    <br /><br />
    <a href="https://smartcv-demo.vercel.app">View Demo</a>
    &middot;
    <a href="https://github.com/MartinFLR/smartcv/issues/new?labels=bug&template=bug_report.yml">Report Bug</a>
    &middot;
    <a href="https://github.com/MartinFLR/smartcv/issues/new?labels=bug&template=feature_request.yml">Request Feature</a>
  </p>
</div>

---

<details>
  <summary>📖 Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project-">About The Project</a>
      <ul>
        <li><a href="#-built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started-">Getting Started</a>
      <ul>
        <li><a href="#prerequisites-">Prerequisites</a></li>
        <li><a href="#installation-">Installation</a></li>
      </ul>
    </li>
    <li><a href="#option-1-install-with-npm-">Option 1: Install with npm</a></li>
    <li><a href="#option-2-run-with-docker-">Option 2: Run with Docker</a></li>
    <li><a href="#roadmap-">Roadmap</a></li>
    <li><a href="#contributing-">Contributing</a></li>
    <li><a href="#license-">License</a></li>
    <li><a href="#contact-">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project 🧠

**SmartCV** is an AI-powered web app that analyzes and compares resumes with job descriptions.  
Its goal is to help candidates improve their CVs, identify missing keywords, and increase compatibility with job offers.

### Key Features ✨

- **AI-powered resume analysis** with adjustable exaggeration levels
- **Profile saving & locking** — keep a CV version fixed for consistent optimization
- **ATS Compatibility Scoring** (resume vs. job description)
- **Keyword detection** and smart suggestions
- **AI-generated Cover Letters**
- **Tone customization** (Formal, Casual, Confident, etc.)
- **Self-hosted Nest.js backend**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### ⚙️ Built With

- [![Angular][Angular.io]][Angular-url]
- [![NestJS][NestJS]][NestJS-url]
- [![Node.js][Node.js]][Node-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Nx][Nx]][Nx-url]
- [![Docker][Docker]][Docker-url]
- [![Taiga UI][TaigaUI]][TaigaUI-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started 🚀

Follow these steps to get a local copy of **SmartCV** up and running.

---

## Prerequisites 🧩

Make sure you have **one** of the following setups:

### ✅ Option A — Node.js (npm)

- **Git** – to clone the repository [Download Git](https://git-scm.com/) Verify installation:

  ```bash
  git --version
  ```

- **Node.js** – includes npm [Download Node.js](https://nodejs.org/)
  ```bash
  node -v
  npm -v
  ```

### Option B — Docker ✅

- Install **Docker Desktop**  
  https://www.docker.com/products/docker-desktop/

- Verify installation:
  ```bash
  docker -v
  docker compose version
  ```

---

## Installation 📦

SmartCV can be installed in **two different ways**.  
Choose the one you prefer:

---

# **Option A: Install with npm** 🚀

1. **Clone the repository**

   ```bash
   git clone https://github.com/MartinFLR/smartcv.git
   cd smartcv
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   mv .env.example .env
   ```

   Add your API key:

   ```env
   GEMINI_API_KEY=your_api_key_here
   OPENAI_API_KEY=your_api_key_here
   ...
   ```

4. **Start the app**

   ```bash
   npm start
   ```

5. Open:

   ```
   http://localhost:4200/
   ```

---

# **Option B: Run with Docker** 🐳

SmartCV includes a full `docker-compose.yml` that starts:

- Frontend (Angular)
- Backend (Nest.Js)

### 1. Clone the repo

```bash
git clone https://github.com/MartinFLR/smartcv.git
cd smartcv
```

### 2. Set up your environment variables

```bash
mv .env.example .env
```

Edit `.env` and set:

```env
GEMINI_API_KEY=your_api_key_here
OPENAI_API_KEY=your_api_key_here
...
```

### 3. Start SmartCV with Docker

```bash
docker compose up -d
```

### 4. Open in the browser:

```
http://localhost:4200/
```

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Roadmap 🗺️

- [x] Multi-language Support
  - [x] Spanish
  - [x] English
  - [ ] Brazilian

- [ ] Additional Templates
  - [x] Harvard
  - [ ] Europass Resume
  - [ ] Infographic Resume
  - [ ] Creative Resume

See all issues here:  
https://github.com/MartinFLR/smartcv/issues

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

# Contributing 🤝

Contributions are **greatly appreciated**!

### How to Contribute

1. **Fork the project**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "feat: Add AmazingFeature"
   ```
4. **Push**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Top Contributors

<a href="https://github.com/MartinFLR/smartcv/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MartinFLR/smartcv" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

# License 📜

Distributed under the **AGPL-3.0 License**.  
See `LICENSE.txt` for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

# Contact 📬

[![GitHub][github-shield]][github-url]  
[![LinkedIn][linkedin-shield]](https://linkedin.com/in/martin-leonardo-flores)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS -->

[contributors-shield]: https://img.shields.io/github/contributors/MartinFLR/smartcv?style=flat&color=4ade80&labelColor=18181b
[contributors-url]: https://github.com/MartinFLR/smartcv/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MartinFLR/smartcv?style=flat&color=60a5fa&labelColor=18181b
[forks-url]: https://github.com/MartinFLR/smartcv/network/members
[stars-shield]: https://img.shields.io/github/stars/MartinFLR/smartcv?style=flat&color=facc15&labelColor=18181b
[stars-url]: https://github.com/MartinFLR/smartcv/stargazers
[issues-shield]: https://img.shields.io/github/issues/MartinFLR/smartcv?style=flat&color=fb7185&labelColor=18181b
[issues-url]: https://github.com/MartinFLR/smartcv/issues
[license-shield]: https://img.shields.io/github/license/MartinFLR/smartcv?style=flat&color=a78bfa&labelColor=18181b
[license-url]: https://github.com/MartinFLR/smartcv/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/martinflr
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org
[NestJS]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[NestJS-url]: https://nestjs.com
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com
[Nx]: https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white
[Nx-url]: https://nx.dev
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
[TaigaUI]: https://img.shields.io/badge/Taiga%20UI-00BFA6?style=for-the-badge&logo=angular&logoColor=white
[TaigaUI-url]: https://taiga-ui.dev/
[github-shield]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/MartinFLR
