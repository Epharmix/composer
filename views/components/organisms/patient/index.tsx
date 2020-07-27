import React from 'react';
import { faCheck, faMoon, faBell, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Col, Row } from '@grid';
import { Icon, Text, Tag } from '@atoms';
import { Button, Flag, StatusIndicator } from '@molecules';
import { Badge } from '@organisms';

/* eslint-disable @typescript-eslint/no-unused-vars */
interface PatientProps {
  data: any;
}

// TODO: Turn <Button>...Snooze | Resolve</Button> into molecules/organisms
const Patient: React.FC<PatientProps> = ({ data }) => {
  return (
    <Container style={{
      border: '1px solid red',
    }}>
      <Row>
        <Col>
          
        </Col>
      </Row>
      <Row style={{
        backgroundColor: '#aaa',
      }}>
        <Col>
          <Tag text="High" intent="danger" minimal/>
          Patient Name
          <Icon className="mx-1" icon={faExternalLinkSquareAlt} />
        </Col>
        <Col>
          <Button minimal>
            <Icon className="mr-1" icon={faMoon} />
            <Text>Snooze</Text>
          </Button>
          <Button minimal>
            <Icon className="mr-1" icon={faCheck} />
            <Text>Resolve</Text>
          </Button>
        </Col>
      </Row>
      <div>
        <Badge>
          <Flag>
            <Icon className="mr-1" icon={ faBell } />
            <Text>1</Text>
          </Flag>
          <StatusIndicator color="green" />
          <Text bold>Diabetes</Text>
          <Text>Has &gt; 2 unresolved alerts.</Text>
        </Badge>
      </div>
    </Container>
  );
};

export default Patient;
