# React Dynamic Form
`<DynamicForm formFields={jsonData} />` is a component that:
- renders form dynamically based on JSON data
- renders conditional fields conditionally
- returns form data as JS object on submit
- validates on empty and required fields

## Demo
![sparrow](https://user-images.githubusercontent.com/16429494/124963896-5d921f80-dfee-11eb-9482-3022dd32f0ec.gif)

## Get started
1. Clone this repo
2. Run `yarn add`
3. Run `yarn start`
4. Test the app on `http://localhost:3000/`

### Example Data
```
[
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
```
