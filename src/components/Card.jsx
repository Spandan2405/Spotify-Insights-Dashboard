import Play from "../assets/icons/Play";

function Card({ img, name, owner }) {
  return (
    <div className="h-full w-full flex flex-col md:p-3.5 p-2 group">
      <div className="relative h-3/4 w-full transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:cursor-pointer">
        <img
          src={
            img ??
            "https://cyberogism.com/wp-content/uploads/2023/03/spotify-logo-png.png"
          }
          alt={name}
          className="w-full h-full object-contain rounded-xl transition-all duration-300 group-hover:brightness-50"
        />
        <div className="absolute bottom-4 right-4 w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Play width={24} height={24} className="text-white" />
        </div>
      </div>
      <div className="flex flex-col md:mt-1 md:px-1">
        <div className="font-semibold text-sm md:text-lg text-white line-clamp-1 mt-4 md:mt-0">
          {name}
        </div>
        <div className="hidden md:block text-base font-medium line-clamp-1 text-gray-400">
          {owner}
        </div>
      </div>
    </div>
  );
}

export default Card;
