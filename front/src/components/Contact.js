import React from 'react'
import '../App.css'
import Card from './Card'
import Navbar from './Navbar'
import Footer from './Footer'

export function Contact() {
  return (
    <>
    <Navbar/>
    <div className='contact_wrap'>
      <main className='frame inner'>
        <p className="h4-c">Meet Our <span className="text-sky-600">Team</span></p>
        <Card 
          title='Seo Heawon'
          imageUrl='Otter.jpg'
          body0='Front-end'
          body1='Modeling'
          email='gofltmxj'
        />  

        <Card 
          title='Park Yangsu'
          imageUrl='Koala.jpg'
          body0='Back-end'
          body1='Settings'
          email='pys9307'
        />  

        <Card 
          title='Kang Byungju'
          imageUrl='Lion.jpg'
          body0='Front-end'
          body1='UI'
          email='rkdqudwnek'
        /> 

        <Card 
          title='Kang Minseo'
          imageUrl='Duck.jpg'
          body0='Back-end' 
          body1='Front-end'
          email='kms0000304'
        /> 

        <Card 
          title='Kim Minkyu'
          imageUrl='Cat.jpg'
          body0='Back-end'
          body1='Error Check'
          email='gmk234'
        /> 
      </main>   
    </div>
    <Footer/>
    </>
  )
}