
function SectionTitle({title, subTitle}) {
  return (
    <div className="flex justify-center items-center flex-col my-2">
       <p className="text-[#D99904]">{subTitle}</p>
       <p className="text-4xl font-semibold">{title}</p>
    </div>
  )
}

export default SectionTitle