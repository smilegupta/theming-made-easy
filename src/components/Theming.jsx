import { Helmet } from "react-helmet-async";

const MyComponent = () => {
  const initThemeCSS = () => {
    // This function returns dynamic HTML or CSS string
    return `
      <style>
        :root{
          --primary: 'red'
        }
      </style>
    `;
  };

  return (
    <Helmet>
      <style type="text/css">{initThemeCSS()}</style>
    </Helmet>
  );
};

export default MyComponent;
