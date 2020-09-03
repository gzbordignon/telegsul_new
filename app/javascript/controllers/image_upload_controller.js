import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["imageInput", "preview"];
  connect() {}

  handleChange(e) {
    const input = this.imageInputTarget;
    const preview = this.previewTarget;
    const fileTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
      "image/x-icon",
    ];

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    if (curFiles.length === 0) {
      const para = document.createElement("p");
      para.textContent = "Nenhuma imagem foi seleciona para upload.";
      preview.appendChild(para);
    } else {
      const list = document.createElement("ol");
      preview.appendChild(list);

      for (const file of curFiles) {
        const listItem = document.createElement("li");
        const para = document.createElement("p");
        if (validFileType(fileTypes, file)) {
          para.textContent = `Nome do arquivo ${file.name}, tamanho ${returnFileSize(file.size)}.`;
          const image = document.createElement("img");
          image.src = URL.createObjectURL(file);
          image.style.width = "100px";

          listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent = `File name ${file.name}: Não é um tipo válido de arquivo.`;
          listItem.appendChild(para);
        }

        list.appendChild(listItem);
      }
    }
  }
}

const validFileType = (fileTypes, file) => {
  return fileTypes.includes(file.type);
};

const returnFileSize = number => {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
};
