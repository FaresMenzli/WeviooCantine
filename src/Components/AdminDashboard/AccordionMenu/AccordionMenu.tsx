import React, { useState } from 'react';

const AccordionMenu: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion" id="accordionMenu">
      <div>
        <div >
          <h5 className="mb-0">
            <button
              className={`btn btn-link ${activeIndex === 0 ? '' : 'collapsed'}`}
              onClick={() => handleAccordionClick(0)}
              aria-expanded={activeIndex === 0 ? 'true' : 'false'}
              aria-controls="collapseOne"
            >
              User List
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          className={`collapse ${activeIndex === 0 ? 'show' : ''}`}
          aria-labelledby="headingOne"
          data-parent="#accordionMenu"
        >
          <div className="card-body">Content for Menu 1</div>
        </div>
      </div>

      <div >
        <div >
          <h5 className="mb-0">
            <button
              className={`btn btn-link ${activeIndex === 1 ? '' : 'collapsed'}`}
              onClick={() => handleAccordionClick(1)}
              aria-expanded={activeIndex === 1 ? 'true' : 'false'}
              aria-controls="collapseTwo"
            >
             Order List
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className={`collapse ${activeIndex === 1 ? 'show' : ''}`}
          aria-labelledby="headingTwo"
          data-parent="#accordionMenu"
        >
          <div>Content for Menu 2</div>
        </div>
      </div>

      <div >
        <div >
          <h5 className="mb-0">
            <button
              className={`btn btn-link ${activeIndex === 2 ? '' : 'collapsed'}`}
              onClick={() => handleAccordionClick(2)}
              aria-expanded={activeIndex === 2 ? 'true' : 'false'}
              aria-controls="collapseThree"
            >
             BI Dashboard
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          className={`collapse ${activeIndex === 2 ? 'show' : ''}`}
          aria-labelledby="headingThree"
          data-parent="#accordionMenu"
        >
          <div >Content for Menu 3</div>
        </div>
      </div>
    </div>
  );
};

export default AccordionMenu;