const getters = {
  user: state => state.user.userData,
	cart: state => state.cart.cartData,
	address: state => state.address.addressData,
	chooseAdress: state => state.address.chooseAddress,
	pet: state => state.pet.pet,
	active: state => state.active.active
}
export default getters
