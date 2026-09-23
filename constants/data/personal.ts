import type { PersonalInfo } from "@/types";

export const personal: PersonalInfo = {
  name: "Akshay Singh Thakur",
  email: (process.env.NEXT_PUBLIC_PERSONAL_EMAIL || "").trim(),
  location: "Himachal Pradesh, India",
};
