'use client'
// import ContactFormArea from '@/components/Contact/ContactFormArea';
// import ContactInfo from '@/components/Contact/ContactInfo';
import Drawer from '@/components/Layout/Drawer/Drawer';
// import Footer from '@/components/Layout/Footer/Footer';/
// import FooterCopyright from '@/components/Layout/Footer/FooterCopyright';
import Header from '@/components/Layout/Header/Header';
// import Layout from '@/components/Layout/Layout';
import useToggle from '@/Hooks/useToggle';
import React from 'react';
import HeaderFour from '../Layout/Header/HeaderFour';
// import RootLayout from '../layout'


export default function DrawerHeader() {
  const [drawer, drawerAction] = useToggle(false);

  return (

      <>
         <Drawer drawer={drawer} action={drawerAction.toggle} /> 
         <HeaderFour action={drawerAction.toggle} />
      </>
  );
}
