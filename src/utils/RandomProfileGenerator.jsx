import React from "react";

function RandomProfileGenerator() {
  const randomProfileImg = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Ge4R-DWFsYgGoQ5k6HoAb2n1WcTC1rKEMA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3j2bzZcNlPR4XR9Rq-SNGZy2ypd-IKfd9Xg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3j2bzZcNlPR4XR9Rq-SNGZy2ypd-IKfd9Xg&s",
    "https://thumbs.dreamstime.com/b/fluffy-white-baby-chick-big-eyes-looks-adorably-camera-perfect-phone-wallpaper-cute-profile-picture-adorable-356300233.jpg",
    "https://thumbs.dreamstime.com/b/jungle-baby-deer-beautiful-wild-whitetail-animal-antilope-stag-325306623.jpg",
    "https://img.freepik.com/premium-photo/cartoon-cute-baby-fox-summer-forest_917664-12661.jpg",
    "https://thumbs.dreamstime.com/b/adorable-fluffy-bunny-rabbit-cute-cartoon-d-render-sweet-pet-animal-ai-generated-adorable-d-rendered-image-fluffy-cartoon-359373168.jpg",
    "https://thumbs.dreamstime.com/b/cartoon-animal-cute-funny-baby-panda-waving-cheerfull-wild-animals-348901615.jpg",
    "https://i.pinimg.com/236x/48/5e/2d/485e2d5d4a240db5f6bb9f3fdf989ef9.jpg",
    "https://thumbs.dreamstime.com/b/adorable-baby-wolf-pup-pastel-pink-forest-setting-charming-rendered-cute-cartoonish-style-sits-amidst-soft-dreamy-its-sweet-367209120.jpg",
    "https://img.pikbest.com/origin/09/23/39/81apIkbEsTxSC.jpg!f305cw",
  ];
  const id = Math.floor(Math.random() * randomProfileImg.length);
  return (
    <img
      src={`${randomProfileImg[id]}`}
      alt="Random Profile Img"
      className="w-full h-full rounded-full"
      key={id}
    />
  );
}

export default RandomProfileGenerator;
