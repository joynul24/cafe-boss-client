
function MenuFoodCard({item}) {
  const {name, image, recipe, price} = item || {}
  return (
    <div className="flex gap-5 px-2 mt-12">
        <img className="w-28 object-cover rounded-[0px_200px_200px_200px]" src={image} alt={name} />
        <div>
            <h3 className="text-xl font-medium font-cinzel">{name}</h3>
            <p>{recipe}</p>
        </div>
        <div>
            <p className="font-medium text-yellow-600">${price}</p>
        </div>
    </div>
  )
}

export default MenuFoodCard