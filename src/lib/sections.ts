export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "gallery"
  | "journey"
  | "contact";

export const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
