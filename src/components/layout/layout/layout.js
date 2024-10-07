import React from 'react';
import { Script } from "gatsby";

import '../../../styles/variables.css';
import '../../../styles/global.css';
import { Seo } from '../../shared';
import Navigation from '../navbar';
import Footer from '../footer';

// Setup and attach Google Analytics script using Gatsby
// Script module & template literals to wrap the JS
const GoogleAnalytics = () => (
  <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EN4BXL6CWQ&l=defaultGtm"></Script>
    <Script>
      {`
        window.defaultGtm = window.defaultGtm || [];
        function gtag(){defaultGtm.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-EN4BXL6CWQ');
      `}
    </Script>
    {/* TODO: Because Alex Hockley's google ads account is attached. Should not have two GTM tags usually. */}
    <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-11349270605&l=advertGtm"></Script>
    <Script>
      {`
        window.advertGtm = window.advertGtm || [];
        function gtag(){advertGtm.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-11349270605');
      `}
    </Script>
  </>
);

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <GoogleAnalytics />
        <Navigation />
        <main style={{
          backgroundColor: 'var(--secondary)',
          backgroundImage: 'url("images/thp_wallpaper_light.png")',
          backgroundSize: '75%',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: '-20%'
        }}>
          {children}
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;
