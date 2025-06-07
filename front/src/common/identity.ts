const createId = () => {
  const numbers = Math.random().toString();
  return `${numbers.slice(2, 5)}-${numbers.slice(
    5,
    7,
  )}-${numbers.slice(7, 11)}`;
};

export function setName(name: string) {
  localStorage.setItem("name", name);
}

export function getName() {
  const name = localStorage.getItem("name");
  console.log("getNameeeee", { name });
  if (name || name === "") {
    return name;
  }
  return getIdentity();
}

export function getIdentity(): string {
  const id = localStorage.getItem("id");
  if (id) {
    return id;
  }
  localStorage.setItem("id", createId());
  return localStorage.getItem("id") || "really wrong";
}
