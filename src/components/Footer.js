import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer  has-shadow is-white" id="footer-main">
      <div className="content has-text-centered">
        <p>
          <strong>The Big Smoke</strong> repo can be found on{' '}
          <a href="https://github.com/FouldsEJ/project-3">
            {' '}
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </p>
        <p>
          Created by{' '}
          <a href="https://www.linkedin.com/in/edward-foulds-138170126/">
            Edward Foulds
          </a>
          ,{' '}
          <a href="https://www.linkedin.com/in/priya-patel-974621124/">
            Priya Patel
          </a>{' '}
          and{' '}
          <a href="https://www.linkedin.com/in/tatiana-guzun-a54125146/">
            Tatiana Guzun
          </a>{' '}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
