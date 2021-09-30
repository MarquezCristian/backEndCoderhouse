const fs = require("fs");


 const item1 = {
         title:'Impresora hp',
         price: 14000,
         thumbnail:'https://www.mercadolibre.com.ar/impresora-simple-funcion-xerox-phaser-3020bi-con-wifi-blanca-y-azul-220v-240v/p/MLA15233711?pdp_filters=category:MLA1676#searchVariation=MLA15233711&position=1&search_layout=stack&type=product&tracking_id=353719de-3cce-4fa6-856a-857387209993&gid=1&pid=1'
     }
     const item2 = {
      title:'Oculus quest',
      price: 299,
      thumbnail:'https://www.amazon.com/-/es/Oculus-Quest-Advanced-All-One-Virtual/dp/B099VMT8VZ/ref=lp_16225016011_1_1'
  }
  const item3 = {
    title:'Mouse',
    price: 30,
    thumbnail:'https://www.amazon.com/-/es/Razer-Gaming-Viper-inal%C3%A1mbrico-entrada/dp/B084RPZD6T/ref=sr_1_12?dchild=1&qid=1632360361&rnid=16225016011&s=videogames-intl-ship&sr=1-12'
}
 
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.id = 0;
    this.data = [];
  }

  async save(obj) {
    await this.getAll();
    this.id++;

    this.data.push({
      id: this.id,
      product: obj,
    });
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    await this.getAll();
    let obj = []
    this.data.map((product)=>{
      if(this.id === id) obj = product;
    });
    console.log(obj);
  }
  async getAll() {
    try {
        const data = await fs.promises.readFile(`./${this.archivo}`)
        const listas = JSON.parse(data);

        return listas;
    } catch (eror) {
        console.error("Error:" ,eror);
    }
  }
  async deleteById(id) {
    await this.getAll();
    let objI = 0;
    this.data.map((product)=>{
      if(product.id === id) objI = this.data.indexOf(product);
    });
    this.data.splice(objI, 1);
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));
    } catch (error) {
      console.log(error);
    }
  
  }
  async deleteAll(archivo) {
    fs.promises.unlink(`./${archivo}`, (error) => {
      if(error){
        console.log(error);
      }else{
        console.log(`${archivo} eliminado`)
      }
    })
  }
}

const prod = new Contenedor('archivo.txt')

const func = async ()=>{
  await prod.save(item1);
  await prod.save(item2);
  await prod.save(item3);
  await prod.deleteById(2);
  await prod.getById(3)
  await prod.deleteAll('archivo.txt')
  
}

module.exports = Contenedor;