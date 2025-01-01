import React from 'react';

import Footer from './footer';
import Header from './header';

function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-screen-xl mx-auto">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
