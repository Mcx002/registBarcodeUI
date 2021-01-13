<template>
  <div>
    <b-container>
      <b-row class="mt-5 pt-3 mb-4">
        <b-col class="d-flex justify-content-center align-items-center mb-4" sm="12">
          <img src="@/assets/img/011.png" class="img-preview"/>
        </b-col>
        <b-col sm="12">
          <p style="text-align:center">Registration Barcode App adalah aplikasi yang berguna untuk memudahkan penerimaan tiket masuk dari peserta sebuah event oleh panitia penyelenggara event. Web app ini adalah web aplikasi untuk penginputan peserta yang akan bergabung mengikuti event yang akan diselenggarakan. Aplikasi akan otomatis mengirim email ke email para peserta dengan mengirimkan sepucuk surat berisikan barcode yang berguna sebagai tiket masuk kedalam event yang diselenggarakan. panitia bisa membuat beberapa event untuk diselenggarakan dan barcode yang diberikan kepada user tidak akan bisa dipakai di event lain kecuali di event dimana dia telah didaftarkan.</p>
        </b-col>
      </b-row>
      <b-row class="mt-5 pt-5 mb-4">
        <b-col class="d-flex justify-content-md-end justify-content-center  align-items-center mb-4" md="4">
          <img src="@/assets/img/021.png" class="img-preview"/>
        </b-col>
        <b-col md="8" class="d-flex align-items-center">
          <p class="text-md-left" style="text-align:center">Setelah ditampilkan halaman intro, selanjutnya pengguna atau panitia akan disuguhkan halaman untuk memasukan code event yang sedang diadakan untuk dapat mengakses halaman pengecekan barcode peserta. Dihalaman ini hanya event yang sedang berlangsung yang dapat dicoba untuk dimasuki, jika event belum mulai atau sudah terlampau lebih dari waktu pelaksanaan, maka halaman scan tidak akan bisa terakses.</p>
        </b-col>
      </b-row>
      <b-row class="mt-5 pt-5">
        <b-col order-md="2" class="d-flex justify-content-md-start justify-content-center align-items-center mb-4" md="4">
          <img src="@/assets/img/031.png" class="img-preview"/>
        </b-col>
        <b-col order-md="1" md="8" class="d-flex align-items-center">
          <p class="text-md-right" style="text-align:center">Setelah event code telah terverifikasi dan event sedang benar benar berlangsung(belum dimulai atau sudah berlalu) maka panitia akan di alihkan ke halaman utama, yaitu halaman scan result. kondisi ketika belum di scan, aplikasi akan menunjukan tampilan seperti di gambar. panitia bisa menekan tombol scan untuk mulai men-scan barcode peserta. pastikan untuk terhubung dengan koneksi yang sama dengan koneksi yang digunakan server.</p>
        </b-col>
      </b-row>
      <b-row class="mt-5 pt-5">
        <b-col class="d-flex justify-content-md-end justify-content-center align-items-center mb-4" md="4">
          <img src="@/assets/img/051.png" class="img-preview"/>
        </b-col>
        <b-col md="8" class="d-flex align-items-center">
          <p class="text-md-left" style="text-align:center">Setelah proses scan, system akan mengecek data barcode ke database, apakah barcode benar sesuai dan terdaftar di dalam event yang sedang berlangsung tersebut atau tidak. kemudian setelah pengecekan selesai maka panitia akan dialihkan kembali ke halaman utama, dengan hasil dari pengecekan yang telah dilakukan. contoh pada gambar adalah ketika barcode tertera dalam database. </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import { setHeaderToken } from '@/utils/auth'
import { dateFormat } from '@/utils/format'

export default {
  name: 'Home',
  computed:{
  },
  data(){
    return{
      isBusy:false,
      show:true,
    }
  },
  mounted(){
    // const token = localStorage.getItem('token')

    // if(token){
    //   setHeaderToken(token)
    // }else{
    //   this.$router.push('/login') 
    // }

    this.$store.dispatch('getUser')
    this.isBusy = true
    this.$store.dispatch('getEvents')
      .then(()=>this.isBusy=false)
      .catch(()=>this.isBusy=false)
  },
  methods:{
    checkLogin(){
      console.log(this.$store.getters.getUser)
    },
    addEvent(){
      this.form.be_end = dateFormat(this.be_end)
      this.$store.dispatch('addEvent',this.form)
        .then(res=>{
          console.log(res)
          this.$bvModal.hide('add-form')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    testSubmit(){
      console.log('cek')
    },
    logout(){
      this.$swal("kamu telah logout")
      this.$store.dispatch('logout')
    }
  } 
}
</script>
<style lang="scss">
  .nav-link{
    outline:none;
  }
  .dropdown-menu{
    background-color: #17a2b8 !important;
    border: none !important;
    a{
      color:white;
    }
  }
  .img-preview{
    height:350px
  }
</style>
