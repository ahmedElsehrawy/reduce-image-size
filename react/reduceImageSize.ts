const WIDTH = 800;

export const uploadImage = (imageUpload: any) => {
  if (imageUpload) {
    let reader = new FileReader();
    reader.readAsDataURL(imageUpload);

    reader.onload = (event: any) => {
      let imageUrl = event.target.result;
      console.log("before reduce", imageUpload);
      let image = document.createElement("img");
      image.src = imageUrl;

      image.onload = (e: any) => {
        let canvas = document.createElement("canvas");
        let ratio = WIDTH / e.target.width;
        canvas.width = WIDTH;
        canvas.height = e.target.height * ratio;

        const context = canvas.getContext("2d");

        context?.drawImage(image, 0, 0, canvas.width, canvas.height);

        let newImageUrl = context?.canvas.toDataURL("image/jpeg", 50);

        let imageFile = urlToFile(newImageUrl);
        console.log("imageFile after reduce:", imageFile);
      };
    };
  }
};

let urlToFile = (url: any) => {
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
  return file;
};
