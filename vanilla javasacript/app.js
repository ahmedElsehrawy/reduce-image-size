const WIDTH = 800;

let input = document.getElementById("input");

input.addEventListener("change", (event) => {
  let imageFile = event.target.files[0];
  console.log(
    "🚀 ~ file: app.js ~ line 41 ~ input.addEventListener ~ imageFile",
    imageFile
  );

  let reader = new FileReader();
  reader.readAsDataURL(imageFile);

  reader.onload = (event) => {
    let imageUrl = event.target.result;
    let image = document.createElement("img");
    image.src = imageUrl;

    image.onload = (e) => {
      let canvas = document.createElement("canvas");
      let ratio = WIDTH / e.target.width;
      canvas.width = WIDTH;
      canvas.height = e.target.height * ratio;

      const context = canvas.getContext("2d");

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      let newImageUrl = context.canvas.toDataURL("image/jpeg", 50);

      let imageFile = urlToFile(newImageUrl);
      console.log("imageFile:", imageFile);

      uploadImage(imageFile);
    };
  };
});

let urlToFile = (url) => {
  let arr = url.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let data = arr[1];

  let dataStr = atob(data);

  let n = dataStr.length;

  let dataArray = new Uint8Array(n);

  while (n--) {
    dataArray[n] = dataStr.charCodeAt(n);
  }

  let file = new File([dataArray], "file.jpg", { type: mime });
  console.log("🚀 ~ file: app.js ~ line 83 ~ urlToFile ~ file", file);
  return file;
};

let uploadImage = async (file) => {
  let payload = new FormData();
  payload.append("image", file);

  // post the payload
};
