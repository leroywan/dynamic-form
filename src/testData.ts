import { FormField } from "./components/DynamicForm";

const testData: FormField[] = [
  {
    tag: "input",
    name: "first_name",
    type: "text",
    human_label: "First Name",
    required: true,
  },
  {
    tag: "input",
    name: "last_name",
    type: "text",
    human_label: "Last Name",
  },
  {
    tag: "input",
    name: "email",
    type: "email",
    human_label: "Email Address",
    required: true,
  },
  {
    tag: "input",
    name: "phone_number",
    type: "text",
    human_label: "Phone Number",
  },
  {
    tag: "input",
    name: "job_title",
    type: "text",
    human_label: "Job Title",
  },
  {
    tag: "input",
    name: "date_of_birth",
    type: "date",
    human_label: "Date of Birth",
    required: true,
  },
  {
    tag: "input",
    name: "parental_consent",
    type: "checkbox",
    human_label: "Parental Consent",
    required: true,
    conditional: {
      name: "date_of_birth",
      show_if: (value) => {
        const dateInfo = value.split(/\D/);
        const now = new Date();
        return (
          new Date(dateInfo[0], dateInfo[1], dateInfo[2]) >=
          new Date(now.getFullYear() - 13, now.getMonth(), now.getDate())
        );
      },
    },
  },
];

export { testData };
