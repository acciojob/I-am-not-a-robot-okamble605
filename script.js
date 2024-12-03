//your code here
document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");
  
  const images = ["img1", "img2", "img3", "img4", "img5"];
  
  let selectedImages = [];
  let imageElements = [];

  function renderImages() {
    imageContainer.innerHTML = "";
    para.textContent = "";
    
    // Duplicate a random image
    const randomIndex = Math.floor(Math.random() * images.length);
    const shuffledImages = [...images];
    shuffledImages.push(images[randomIndex]);

    // Shuffle the images
    shuffledImages.sort(() => Math.random() - 0.5);

    shuffledImages.forEach((imgClass) => {
      const img = document.createElement("img");
      img.className = imgClass;
      img.addEventListener("click", () => handleImageClick(img));
      imageContainer.appendChild(img);
    });

    imageElements = Array.from(document.querySelectorAll("img"));
  }

  function handleImageClick(img) {
    if (selectedImages.includes(img) || selectedImages.length === 2) return;

    img.classList.add("selected");
    selectedImages.push(img);

    resetButton.style.display = "inline-block";

    if (selectedImages.length === 2) {
      verifyButton.style.display = "inline-block";
    }
  }

  function resetState() {
    selectedImages.forEach((img) => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
  }

  function verifySelection() {
    verifyButton.style.display = "none";

    if (selectedImages[0].className === selectedImages[1].className) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }

  resetButton.addEventListener("click", () => {
    resetState();
    renderImages();
  });

  verifyButton.addEventListener("click", verifySelection);

  renderImages();
});
