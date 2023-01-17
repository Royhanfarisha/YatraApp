import logo from './logo.svg';
import './App.css';
import React from 'react';
import ModalCreate from './component/modalCreate';

class App extends React.Component {
  constructor () {
    super ();

    this.state = {
      sisaUang : 0,
      persen : 0,
      pemasukan : 0,
      pengeluaran : 0,
      transaksiIn : 0,
      transaksiOut : 0,
      summary : [
        {
          deskripsi : 'Menerima Gaji',
          tanggal : '1 juli 2022',
          nominal : 1000,
          category : 'IN'
        },
        {
          deskripsi : 'Makan warteg',
          tanggal : '1 juli 2022',
          nominal : 1000,
          category : 'OUT'
        }
      ]
    }

    this.tambahItem = this.tambahItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }


    tambahItem(object){
      let newData = [...this.state.summary, object]
      let dataUangIN = newData.filter( (item)=> item.category === 'IN');
      let nominalUangIN = dataUangIN.map((item)=> item.nominal);
      let jumlahUangIN = nominalUangIN.reduce((total, num)=> total + num)

      let dataUangOUT = newData.filter( (item)=> item.category === 'OUT');
      let nominalUangOUT = dataUangOUT.map((item)=> item.nominal);
      let jumlahUangOUT = nominalUangOUT.reduce((total, num)=> total + num)
      
      this.setState({
        pemasukan : jumlahUangIN,
        transaksiIn : nominalUangIN.length,
        pengeluaran : jumlahUangOUT,
        transaksiOut : nominalUangOUT.length,
        sisaUang : jumlahUangIN - jumlahUangOUT,
        persen : (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100,
        summary : newData
      })
    }


  fnHitung(){
      let dataUangIN = this.state.summary.filter( (item)=> item.category === 'IN');
      let nominalUangIN = dataUangIN.map((item)=> item.nominal);
      let jumlahUangIN = nominalUangIN.reduce((total, num)=> total + num)

      let dataUangOUT = this.state.summary.filter( (item)=> item.category === 'OUT');
      let nominalUangOUT = dataUangOUT.map((item)=> item.nominal);
      let jumlahUangOUT = nominalUangOUT.reduce((total, num)=> total + num)

      this.setState({
        pemasukan : jumlahUangIN,
        transaksiIn : nominalUangIN.length,
        pengeluaran : jumlahUangOUT,
        transaksiOut : nominalUangOUT.length,
        sisaUang : jumlahUangIN - jumlahUangOUT,
        persen : (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100
      })
  }    

    componentDidMount() {
      this.fnHitung()
    }
    
  render () {
    return (
      <div className='container'>
        <div className='row awal'>
          <div className='col-12'>
            <h1>YATRA</h1>
            <hr />
            <h2 className='fw-bold'>Rp. {this.state.sisaUang},-</h2>
            <span className='title-md'>sisa uang kamu yaitu {this.state.persen}% doang</span>
          </div>
        </div>

        <div className='row'>

          <div className='col-6'>
            <div className='card'>
              <div className='icon-masuk'>
                <i class="bi bi-wallet"></i>
              </div>
              <span className='title-sm'>Pemasukan</span>
              <h3 className='fw-bold'>Rp. {this.state.pemasukan},-</h3>
              <div>
               <span className='title-sm text-ungu fw-bold'>{this.state.transaksiIn} </span>
               <span className='title-sm'>transaksi</span>
              </div>
            </div>
          </div>

          <div className='col-6'>
            <div className='card'>
              <div className='icon-keluar'>
                <i className='bi bi-cash-stack'></i>
              </div>
              <span className='title-sm'>Pengeluaran</span>
              <h3 className='fw-bold'>Rp. {this.state.pengeluaran},-</h3>
              <div>
               <span className='title-sm text-ungu fw-bold'>{this.state.transaksiOut} </span>
               <span className='title-sm'>transaksi</span>
              </div>
            </div>
          </div>

        </div>

        <div className='row'>

          <div className='col-12 d-flex justify-content-between align-items-center py-2'>
            <h2 className='fw-bold'>Ringkasan transaksi</h2>
            <div className='wrapper-button d-flex'>
              <ModalCreate action={this.tambahItem} category='IN' variant='button-masuk px-3 py-2 me-2 fw-bold' text='Pemasukan' icons='bi bi-plus-circle' modalHeading='Tambahkan Pemasukan'/>
              <ModalCreate action={this.tambahItem} category='OUT' variant='button-keluar px-3 py-2 me-2 fw-bold' text='Pengeluaran' icons='bi bi-dash-circle' modalHeading='Tambahkan Pengeluaran'/>
              
            </div>
          </div>

        </div>

        <div classNam='row'>
          {this.state.summary.map((sum, index)=> {
            return (
               <div key={index} className='col-12 d-flex justify-content-between align-items-center'>
                 <div className='d-flex align-items-center py-3'>
                  <div className={sum.category === 'IN' ? 'icon-masuk' : 'icon-keluar'}>
                    <i class={sum.category === 'IN' ? 'bi bi-wallet' : 'bi bi-cash-stack'}></i> 
                  </div>
                  <div className='hisori'>
                   <h6>{sum.deskripsi}</h6><span className='title'>{sum.tanggal}</span>
                  </div>
                  </div>
            <h5 className={sum.category === 'IN' ? 'icon-masuk' : 'icon-keluar'}>Rp.{sum.nominal},-</h5>
                </div>
            )
          })}
        </div>
      </div>
    )
  }
}




export default App;