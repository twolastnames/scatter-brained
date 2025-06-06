import { getFileWriter } from "../template_helper.js";

const writeComponent = (handler) => {
  getFileWriter("components")((argument) => {
    const parts = argument
      .split("/")
      .map((part) =>
        part.length == 0 ? "" : `${part[0].toUpperCase()}${part.slice(1)}`,
      );
    const name = parts.slice(parts.length - 1);
    return handler({
      path: parts.slice(0, parts.length).join("/"),
      name,
      typesName: `${name}Type`,
      slug: `${name[0].toLowerCase()}${name.slice(1)}`,
    });
  });
};

writeComponent(({ path, name, slug, typesName }) => ({
  data: `
import { type ReactNode } from "react";
import styles from "./${name}.module.scss";
import { type ${typesName} } from "./${typesName}";

export function ${name}(props : ${typesName}): ReactNode {
    return <div
        data-testid="${name}"
        className={styles.${slug}}
    ></div>
}`,
  directory: path,
  filename: `${name}.tsx`,
}));

writeComponent(({ path, name, slug }) => ({
  data: `
.${slug} {

}
`,
  directory: path,
  filename: `${name}.module.scss`,
}));

writeComponent(({ path, name, typesName }) => ({
  data: `
export interface ${typesName} {
}
`,
  directory: path,
  filename: `${typesName}.ts`,
}));
