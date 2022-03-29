export default ({ app }, inject) => {

  inject("test", id => console.log(`HI ${ id }`))

}
