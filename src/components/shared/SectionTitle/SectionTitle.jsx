
function SectionTitle({title, subTitle}) {
  return (
    <div className="flex justify-center items-center flex-col my-2">
       <p className="text-[#D99904]">{subTitle}</p>
       <p className="text-4xl font-semibold border-t-2 border-t-yellow-100 border-b-2 border-b-yellow-100 py-5 mt-5 uppercase">{title}</p>
    </div>
  )
}

export default SectionTitle