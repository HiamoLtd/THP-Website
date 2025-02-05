import React from 'react';
import { Script } from "gatsby";
import { Helmet } from 'react-helmet';
import '../../../styles/variables.css';
import '../../../styles/global.css';
import Navigation from '../navbar';
import Footer from '../footer';

// Add any necessary tags to the header, like imported fonts.
const SiteHead = () => (
  <Helmet>
    <meta name="nonsense" />
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
  </Helmet>
);

// Setup and attach Google Analytics script using Gatsby
// Script module & template literals to wrap the JS
const GoogleAnalytics = () => (
  <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1WWZ3KS6KK"></Script>
    <Script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1WWZ3KS6KK');
      `}
    </Script>
  </>
);

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <SiteHead />
        <GoogleAnalytics />
        <Navigation />
        <main style={{
          backgroundColor: 'var(--secondary)',
        }}>
          {children}
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;
