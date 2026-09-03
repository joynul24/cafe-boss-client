
function FoodCard({item}) {
    const {image, name, recipe} = item || {}
  return (
    <div className="card bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src={image}
      alt={name}
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions">
      <button className="btn btn-outline border-0 border-b-4 border-[#BB8506] bg-[#E8E8E8] text-[#BB8506] hover:bg-[#111827] hover:border-[#111827] hover:text-[#BB8506] uppercase rounded-lg px-6 transition-all duration-300">Add to card</button>
    </div>
  </div>
</div>
  )
}

export default FoodCard