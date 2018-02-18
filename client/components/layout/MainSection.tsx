import * as React from 'react';

export const MainSection: React.SFC = (props) => {
  return (
    <section className="section section-main">
      <div className="container">
        {props.children}
      </div>
    </section>
  );
};
