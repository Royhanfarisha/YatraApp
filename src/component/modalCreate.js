import React from 'react'
import Modal from 'react-bootstrap/Modal';

class ModalCreate extends React.Component {
    constructor() {
      super();
      this.state = {
        show : false,
        deskripsi : '',
        nominal : 0,
        tanggal :'',
        category : ''
      }
      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.tambahItem = this.tambahItem.bind(this);
    }
  
  
    handleClose() {
      this.setState({
        show : false
      })
    }
  
    handleShow() {
      this.setState({
        show : true,
        category : this.props.category
      })
    }
  
    handleChange(aim){
      this.setState({
        [aim.target.name] : aim.target.value
      })
    }
  
    tambahItem(){
      const Data = {
        deskripsi : this.state.deskripsi,
        nominal : parseInt (this.state.nominal),
        tanggal : this.state.tanggal,
        category : this.state.category
      } 
      const fnTambahItem = this.props.action;
      fnTambahItem(Data);
      this.setState({
        show : false
      })
    }
  
  
    render() {
      return(
        <>
        <button onClick={this.handleShow} className={this.props.variant}>{this.props.text} <i className={this.props.icons}></i></button>
  
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3'>
            <label  className='form-label'>Deskripsi</label>
            <input 
              type='text' 
              className='form-control'  
              placeholder='Masukan Deskripsi' 
              name='deskripsi' 
              value={this.state.deskripsi}
              onChange={this.handleChange}
            ></input>
          </div>
  
          <div className='mb-3'>
            <label  className='form-label'>Nominal</label>
            <input 
              type='number' 
              className='form-control'  
              placeholder='Masukan nominal' 
              name='nominal' 
              value={this.state.nominal}
              onChange={this.handleChange}
            ></input>
          </div>
  
          <div className='mb-3'>
            <label  className='form-label'>Tanggal</label>
            <input 
              type='date' 
              className='form-control'  
              placeholder='Masukan Tanggal' 
              name='tanggal' 
              value={this.state.tanggal}
              onChange={this.handleChange}
            ></input>
          </div>
  
          <div>
            <input 
              type='hidden' 
              className='form-control'  
              placeholder='Masukan deskripsi' 
              name='category' 
              value={this.state.category}
              onChange={this.handleChange}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className={this.props.variant} onClick={this.tambahItem}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
      </>
      )
    }
  }

  export default ModalCreate;