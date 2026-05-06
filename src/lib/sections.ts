export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "journey"
  | "contact";

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

