import ReactPDF from "@react-pdf/renderer";
import styles from "./styles";

export const compose = (classes) => {
  const css = {
    //@ts-ignore
    "@import": "url(https://fonts.bunny.net/css?family=nunito:400,600)",
  };

  const classesArray = classes.replace(/\s+/g, " ").split(" ");

  classesArray.forEach((className) => {
    if (styles[className] !== undefined) {
      Object.assign(css, styles[className]);
    }
  });

  return css;
};
