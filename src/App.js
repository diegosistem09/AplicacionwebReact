import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="http://127.0.0.1:8000/api/autos";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    
    id: '',
    placa: '',
    marca: '',
    num_pasajeros: '',
    color: ''
    
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  console.log(response.data.data);
  this.setState({data: response.data.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id; 
  console.log(this.state.form.id);
  const  url  = 'http://127.0.0.1:8000/api/autos/create?placa=67676&numero_pasajeros=2&estado=1&marca=Mercedes Vens&color=verde'; 

  const placa = this.state.form.placa;
  const num_pasajeros = this.state.form.num_pasajeros;
  const marca = this.state.form.marca;
  const color = this.state.form.color; 
  
  //await  axios.post(url+this.state.form.id, this.state.form).then(response=>{
    await  axios.post(url+"?placa="+placa+"&numero_pasajeros="+num_pasajeros+"&estado=1"+"&marca="+marca+"&color="+color).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}


modalInsertar=()=>{  
  this.setState({modalInsertar  : !this.state.modalInsertar});
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,    
    [e.target.id]: e.target.value,    
    [e.target.placa]: e.target.value,    
    [e.target.marca]: e.target.value,   
    [e.target.num_pasajeros]: e.target.value,
    [e.target.color]: e.target.value   

  }

});
// console.log("console ->"+e.target.value);
// console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Auto</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Placa</th>
          <th>Numero de pasajeros</th>
          <th>Marca</th>
          <th>Color</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(auto=>{
          return(
            <tr>
          <td>{auto.id}</td>
          <td>{auto.placa}</td>
          <td>{auto.Marca}</td>
          <td>{auto.num_pasajeros}</td>
          <td>{new Intl.NumberFormat("en-EN").format(auto.num_pasajeros)}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarauto(auto); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarauto(auto); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    
                    <br />
                    <label htmlFor="Placa">Placa</label>
                    <input className="form-control" type="text" name="placa" id="placa" onChange={this.handleChange} value={form?form.placa: ''}/>
                    <br />
                    <label htmlFor="nombre">Marca</label>
                    <input className="form-control" type="text" name="marca" id="marca" onChange={this.handleChange} value={form?form.marca: ''}/>
                    <br />
                    <label htmlFor="Num_pasajeros">Numero de pasajeros</label>
                    <input className="form-control" type="text" name="num_pasajeros" id="num_pasajeros" onChange={this.handleChange} value={form?form.num_pasajeros:''}/>
                    <br />
                    <label htmlFor="Color">Color</label>
                    <input className="form-control" type="text" name="color" id="color" onChange={this.handleChange} value={form?form.color:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la empresa {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default App;
