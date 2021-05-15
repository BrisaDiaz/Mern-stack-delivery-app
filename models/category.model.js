const mongoose = require('mongoose')
const Schema = mongoose.Schema

CATEGORYS = [
  {name:'pizzas',icone: '🍕'},{name:'hamburguesas', icone: '🍔'}, {name:'acompañantes', icone: '🍟'}, {name:'pastas', icone: '🍝'}, {name:'Gaceosas', icone: '🥤'}, {name:'hot dogs', icone: '🌭'}, {name:'empanadas', icone: '🥟'}, {name:'Sandwiches', icone: '🥪'}, {name:'tacos', icone: '🌮'},  {name:'burritos', icone: '🌯'}, {name:'bebidas alcoholicas', icone: '🍺'}, {name:'pollo frito', icone: '🍗'}, {name:'ensaladas', icone: '🥗'}, {name:'sushi', icone: '🍣'}, {name:'asado', icone: '🥩'}, {name:'postres', icone: '🥧'}, {name:'sopas', icone: '🥣'},  {name:'combos', icone: '💣'}, {name:'otros', icone: '🍽️'}, {name:'new category', icone: '👩‍🍳'},

]

const categorySchema = new Schema(
  {
    name: String,
    icone:String,
  },
  {
    versionKey: false,
  }
);

const Category = mongoose.model('Role', categorySchema);

module.exports = {Category,CATEGORYS}