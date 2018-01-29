import * as React from 'react';

export const MainSection: React.SFC = (props) => {
  return (
    <section className="section-main section">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};
