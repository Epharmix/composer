import React from 'react';
import { faBell, faChartLine, faMoon, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row } from '@grid';
import { Icon, Text } from '@atoms';
import { Flag, Button } from '@molecules';
import { Badge, Tooltip } from '@organisms';

interface AlertProps {
  onClick: any;
}

const Alert: React.FC<AlertProps> = ({ onClick }) => {
  return (
    <div className="bg-white pt-4 pb-2 pr-2">
      <Container fluid style={{ padding: 0 }}>
        <Row>
          <Col>
            <Tooltip
              id="tltp-time-1"
              content={
                <React.Fragment>
                  Alert triggered<br/>Jun 11 at 11:39pm
                </React.Fragment>
              }
            >
              <Badge>
                <Flag bgColor="blue">
                  <Icon icon={faBell} className="text-brand-white mr-1 text-sans-sm" />
                  <Text bold size="sm" color="brand-white">Yesterday</Text>
                </Flag>
                <Text size="sm">11:39am</Text>
              </Badge>
            </Tooltip>
          </Col>
          <Col>
            <div className="text-right">
              <Tooltip
                id="tltp-view-data-1"
                content={
                  <React.Fragment>
                    <Text as="h3" spacing="my-1">
                      <Icon icon={faChartLine} className="text-brand-white mr-1" />
                      <Text size="md">View data</Text>
                    </Text>
                    <Text as="p" spacing="mb-0">Explore Tania's COPD data and settings.</Text>
                  </React.Fragment>
                }
              >
                <Button bare minimal onClick={onClick}>
                  <Text size="sm">COPD</Text>
                  <Icon icon={faChartLine} className="ml-1"/>
                </Button>
              </Tooltip>
              <Tooltip
                id="tltp-snooze-1"
                content={
                  <React.Fragment>
                    <Icon icon={faMoon} className="text-brand-white mr-1" />
                    <Text bold>Snooze Alert</Text> 
                  </React.Fragment>
                }
              >
                <Button bare minimal className="mx-2" onClick={() => console.info('zzzz')}>
                  <Icon icon={faMoon} />
                </Button>
              </Tooltip>
              <Tooltip
                id="tltp-snooze-1"
                content={
                  <React.Fragment>
                    <Icon icon={faCheck} className="text-brand-white mr-1" />
                    <Text bold>Resolve Alert</Text> 
                  </React.Fragment>
                }
              >
                <Button bare minimal onClick={() => console.info('resolve!')}>
                  <Icon icon={faCheck} />
                </Button>
              </Tooltip>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mt-5 ml-3 mr-3 mb-2">
              <Text bold spacing="mr-1">Tania Kemmer</Text>
              <Text>Patient Tania has reported sputum color is different.</Text>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Alert;
