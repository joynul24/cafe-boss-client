
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
      <button className="btn btn-primary uppercase">Add to card</button>
    </div>
  </div>
</div>
  )
}

export default FoodCard