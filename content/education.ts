export interface EducationEntry {
  credential: string;
  school: string;
  location: string;
  dates: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  date: string;
}

export interface SpokenLanguage {
  name: string;
  level: string;
}

export const education: EducationEntry[] = [
  {
    credential: "B.S. Computer Science",
    school: "Universidad Bicentenaria de Aragua",
    location: "Venezuela",
    dates: "2007 – 2011",
  },
  {
    credential: "A.S. Systems Analysis and Design",
    school: "IUPFAN / UNEFA",
    location: "Venezuela",
    dates: "2003 – 2006",
  },
  {
    credential: "Full Stack Web Development",
    school: "freeCodeCamp",
    location: "",
    dates: "",
  },
];

export const certifications: CertificationEntry[] = [
  {
    name: "EF SET English Certificate, C1 Advanced",
    issuer: "EF SET",
    date: "Mar 2024",
  },
  {
    name: "Next.js: The Complete Developer's Guide",
    issuer: "Udemy",
    date: "Mar 2024",
  },
  {
    name: "Node.js & Angular 2",
    issuer: "IT Master",
    date: "Jan 2017",
  },
];

export const spokenLanguages: SpokenLanguage[] = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "C1, full professional proficiency" },
];
