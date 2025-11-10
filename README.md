[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/martinFLR/smartcv">
    <img src="/apps/frontend/public/assets/logo.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">SmartCV</h3>

  <p align="center">
    A free self-hosted AI assistant that helps you analyze, optimize, and match resumes to job descriptions.    <br />
    <br />
    <a href="https://smartcv.vercel.app">View Demo</a>
    &middot;
    <a href="https://github.com/martinfloresdev/smartcv/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/martinfloresdev/smartcv/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

---

<details>
  <summary>📖 Table of Contents</summary>
  <ol>
    <li><a href="#about">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## 🧠 About The Project

[![SmartCV Screenshot][product-screenshot]](https://smartcv.vercel.app)

**SmartCV** is an AI-powered web app that analyzes and compares resumes with job descriptions.  
Its goal is to help candidates improve their CVs, identify missing keywords, and increase compatibility with job offers.

### ✨ Key Features

- **AI-powered resume analysis** with adjustable levels of exaggeration
- **Profile saving & locking** — keep a CV version fixed for consistent optimization
- **ATS Compatibility Scoring** (resume vs. job description)
- **Keyword detection** and smart suggestions
- **AI-generated Cover Letters**, optimized for different contexts:
  - LinkedIn message
  - Email application
  - Job form submission
  - Internal referral
- **Tone customization** — instantly switch between:
  - Formal
  - Enthusiastic
  - Casual
  - Neutral
  - Confident
- **Self-hosted Express.js backend** — simple to deploy and run anywhere
- **Completely free! :D**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### ⚙️ Built With

- [![Angular][Angular.io]][Angular-url]
- [![Node.js][Node.js]][Node-url]
- [![Express.js][Express.js]][Express-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Taiga UI][TaigaUI]][TaigaUI-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 🚀 Getting Started

Follow these steps to get a local copy of **SmartCV** up and running.

### Prerequisites

Make sure you have the following installed:

- **Git** – to clone the repository  
  [Download Git](https://git-scm.com/)  
  Verify installation:

  ```sh
  git --version
  ```

- **Node.js** (v20.19.0 or newer) – includes npm  
  [Download Node.js](https://nodejs.org/)  
  Verify installation:
  ```sh
  node -v
  npm -v
  ```

## 🚀 Installation

Follow these steps to set up and run **SmartCV** locally:

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
   Rename the `.env.example` file to `.env`:

   ```bash
   cd backend
   mv .env.example .env
   cd ..
   ```

   Then open it and add your API key:

   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the app**

   ```bash
   npm start
   ```

5. **Open SmartCV in your browser**  
   Once the server is running, navigate to:

   ```
   http://localhost:4200/
   ```

6. ✅ **Done!**  
 You’re all set — SmartCV should now be running locally!
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Roadmap

- [ ] Multi-language Support
  - [x] Spanish
  - [ ] English
  - [ ] Brazilian
- [ ] Add Additional Templates

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

If you have a suggestion that would make **SmartCV** better, you can:

- Fork the repository
- Create a pull request
- Or open an issue with the `enhancement` label

Don't forget to ⭐ the project if you find it useful!

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/MartinFLR/smartcv/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MartinFLR/smartcv" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[![GitHub][github-shield]][github-url]  
[![LinkedIn][linkedin-shield]](https://linkedin.com/in//martin-leonardo-flores)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org
[Express.js]: https://img.shields.io/badge/Express.js-%23404d59?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
[TaigaUI]: https://img.shields.io/badge/Taiga%20UI-00BFA6?style=for-the-badge&logo=angular&logoColor=white
[TaigaUI-url]: https://taiga-ui.dev
[github-shield]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/MartinFLR
[linkedin-url]: https://linkedin.com/in/martinflr
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white
