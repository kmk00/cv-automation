import { useState } from "react";
import JobDescriptionForm from "./components/JobDescriptionForm";
import CreatingCvProcess from "./components/CreatingCvProcess";
import CvToEdit from "./components/CvToEdit";

function App() {
  const [applicationSteps, setApplicationSteps] = useState<number>(-1);
  const [jobListing, setJobListing] = useState<string>("");

  const cv = {
    name: "Lukasz",
    surname: "Kaminski",
    phone_number: "+48 720 762 336",
    email: "lukaminskii00@gmail.com",
    linkedin: "linkedin.com/in/lukaszkaminskii00",
    github: "github.com/kmk00",
    portfolio: "kmk00.netlify.app",
    work_profile:
      "Jestem osobą komunikatywną, sumienną i otwartą na nowe wyzwania. Cenię sobie pracę zespołową i dbanie o wysoką jakość obsługi klienta. Posiadam doświadczenie w pracy z ludźmi, potrafię szybko się uczyć i dobrze odnajduję się w dynamicznym środowisku. Szukam pracy, w której będę mógł rozwijać swoje umiejętności interpersonalne, organizacyjne oraz w której będę mieć realny wpływ na doświadczenia klientów.",
    work_experience: [
      {
        position_name: "Wolontariusz Web Developer",
        company_name: "Fundacja Kompetenci Cyfrowych",
        work_start: "Lut 2025",
        work_end: "Maj 2025",
        responsibilities: [
          "Współpraca z zespołem i klientem przy projektowaniu strony internetowej schroniska",
          "Utrzymywanie i aktualizowanie treści na stronie",
        ],
      },
      {
        position_name: "Praktykant Web Developer",
        company_name: "Influencja.pl",
        work_start: "Mar 2023 ",
        work_end: "Cze 2023",
        responsibilities: [
          "Debugowanie i optymalizacja responsywności stron internetowych (HTML, CSS, JavaScript)",
          "Tworzenie i modyfikacja szablonów stron oraz landing pages",
          "Aktualizacja i modyfikowanie treści witryn e-commerce z wykorzystaniem CMS WordPress",
          "Współpraca z zespołem projektowym",
          "Wprowadzanie poprawek UX/UI zgodnie z zaleceniami projektantów",
        ],
      },
      {
        position_name: "Technik teleinformatyk",
        company_name: "Telekom.pl ",
        work_start: "Lip 2018 ",
        work_end: "Sie 2018 ",
        responsibilities: [
          "Współpraca z zespołem techników przy instalacji i konfiguracji urządzeń",
          "Wprowadzanie danych do systemu firmy",
          "Pomoc przy spawaniu światłowodów",
        ],
      },
    ],
    education: [
      {
        subject: "Zarządzanie (studia licencjackie)",
        date_start: "Paź 2024",
        school_name: "Akademia Nauk Stosowanych, Nowy Sącz ",
      },
      {
        subject: "Informatyka (studia inżynierskie)",
        date_start: "Paź 2020",
        date_end: "Lut 2024",
        school_name: "Uniwersytet Komisji Edukacji Narodowej, Kraków",
      },
      {
        subject: "Teleinformatyka (technikum)",
        date_start: "Wrz 2016",
        date_end: "Cze 2020",
        school_name: "Zespół Szkół Elektryczno-Mechanicznych, Nowy Sącz",
      },
    ],
    projects: [
      {
        name: "Kanji Practice App",
        description:
          "Aplikacja do nauki japońskich znaków Kanji, uporządkowanych według poziomu nauczania w szkołach japońskich",
        technologies: ["Vue.js", "Tailwind CSS", "Pinia", "GSAP"],
      },
    ],
    soft_skills: [
      "Gotowość do nauki oraz rozwoju kompetencji interpersonalnych i zawodowych",
      "Umiejętność pracy zespołowej i wspólnego osiągania celów",
      "Odpowiedzialność i samodzielność w działaniu",
      "Komunikatywność i pozytywne nastawienie w kontaktach z ludźmi",
      "Skuteczne zarządzanie czasem oraz organizacja pracy własnej",
      "Gotowość do pracy w zmiennych warunkach i elastyczność",
    ],
    technical_skills: [
      "Obsługa pakietu Microsoft Office (Word, Excel, PowerPoint)",
      "Znajomość technologii internetowych (HTML, CSS, Wordpress, Typescript, React)",
      "Znajomość środowiska Windows i podstaw Linux",
      "Umiejętność konfiguracji urządzeń sieciowych",
      "Znajomość programów DaVinci Resolve i Adobe Photoshop",
      "Umiejętność zarządzania treścią na stronach internetowych (CMS)",
    ],
    languages: [
      {
        name: "Angielski",
        level: "B2 - Certyfikat Cambridge English: First (FCE)",
      },
      {
        name: "Polski",
        level: "Ojczysty",
      },
    ],
    interests: [
      "Nowe technologie",
      "AI",
      "Programowanie",
      "Kultura japońska",
      "Sport",
      "Montaż wideo",
    ],
  };

  return (
    <>
      <CvToEdit personalizedCv={cv} />

      {applicationSteps === 0 && (
        <JobDescriptionForm
          setApplicationSteps={setApplicationSteps}
          setJobListing={setJobListing}
        />
      )}

      {applicationSteps > 0 && (
        <CreatingCvProcess
          applicationSteps={applicationSteps}
          setApplicationSteps={setApplicationSteps}
          jobListing={jobListing}
        />
      )}
    </>
  );
}

export default App;
