import { personal } from "./personal";
import { projects } from "./projects";
import { experience } from "./experience";
import { skills, TECH_CATEGORIES } from "./skills";
import { socials } from "./socials";

export { personal } from "./personal";
export { projects } from "./projects";
export { experience } from "./experience";
export { skills, TECH_CATEGORIES } from "./skills";
export { socials } from "./socials";

export * from "@/types";

export const PORTFOLIO_DATA = {
  personal,
  projects,
  experience,
  skills,
  socials,
};

export default PORTFOLIO_DATA;
