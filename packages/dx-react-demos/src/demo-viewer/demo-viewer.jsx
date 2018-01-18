import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Nav, NavItem, Tab } from 'react-bootstrap';

import { demos } from '../demo-registry.json';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';
import { SourceCode } from './source-code';

export const DemoViewer = (
  { match: { params: { demoName, sectionName }, url } },
  { embeddedDemoOptions: { defaultTab = 'preview' } },
) => (
  <Switch>
    <Route
      path={`${url}/:themeName/:variantName/clean`}
      render={({ match: { params: { themeName, variantName } } }) => (
        <div>
          <DemoRenderer
            themeName={themeName}
            variantName={variantName}
            sectionName={sectionName}
            demoName={demoName}
          />
        </div>
      )}
    />
    <Route
      path={url}
      render={() => (
        <div style={{ paddingTop: '8px' }}>
          <ThemeViewer
            avaliableThemes={Object.keys(demos[sectionName][demoName])}
          >
            {({ themeName, variantName }) => (
              <Tab.Container
                id={`${sectionName}-${demoName}-demo`}
                defaultActiveKey={defaultTab}
              >
                <div style={{ marginTop: '-38px' }}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="preview">Preview</NavItem>
                    <NavItem eventKey="source">Source</NavItem>
                  </Nav>
                  <Tab.Content
                    animation
                    mountOnEnter
                    style={{ marginTop: '20px' }}
                  >
                    <Tab.Pane eventKey="preview">
                      <DemoRenderer
                        themeName={themeName}
                        variantName={variantName}
                        sectionName={sectionName}
                        demoName={demoName}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="source">
                      <SourceCode
                        themeName={themeName}
                        sectionName={sectionName}
                        demoName={demoName}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            )}
          </ThemeViewer>
        </div>
      )}
    />
  </Switch>
);

DemoViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      demoName: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
};

DemoViewer.contextTypes = {
  embeddedDemoOptions: PropTypes.object.isRequired,
};