
function SectionCover({img, title, subTitle}) {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat flex justify-center items-center h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] px-4 sm:px-10"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Dark Overlay Box */}
      <div className="bg-black/60 w-full max-w-5xl flex flex-col justify-center items-center text-center text-white py-10 px-6 sm:py-16 sm:px-12 md:py-20 md:px-20">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-bold uppercase tracking-widest mb-3 md:mb-4">
          {title}
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-cinzel uppercase tracking-wider text-gray-200 max-w-2xl">
          {subTitle}
        </p>
      </div>
    </div>
  )
}

export default SectionCover